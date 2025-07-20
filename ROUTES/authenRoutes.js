const express = require('express');
const dbgetter = require('../DATABASE/dbGetter.js');
const connection = require('../DATABASE/dbSetup.js');
const mailFunc = require('../FUNCTION/mailSetup.js');
const session = require('express-session');
const md5 = require('md5');
const path = require('path');
const router = express.Router();
const conn = connection();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Session middleware
router.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: false
}));


// route to open the login form
router.get('/login', (req, res) => {
    res.render('form/login_via_password', { errorMsg: null, display: null });
});


// route to get data from the login form for login process
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const encPass = md5(password);

    const query = `SELECT * FROM applicant_credentials WHERE emailID = '${email}' and password = '${encPass}' LIMIT 1`;

    conn.query(query, (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        if (result.length > 0) {
            if(result[0].isActive == 1){
                req.session.loggedIn = true;
                req.session.applicantId = result[0].applicant_id;
                res.redirect('/jobSeeker?toastNotification=Logged In Successfully!');
            }else{
                res.render('form/login_via_password', { errorMsg: null, display: true });
            }
        } else {
            res.render('form/login_via_password', { errorMsg: 'Invalid credentials', display: null });
        }
    });
});


// route to open the login via otp form
router.get('/login_via_otp', (req, res) => {
    res.render('form/login_via_otp', { errorMsg: null, display: null });
})


router.post('/login_via_otp', (req, res) => {
    const emailID = req.body.emailID;
    console.log('OTP login attempt for email:', emailID);
    
    conn.query(`SELECT * FROM applicant_credentials WHERE emailID = '${emailID}'`, async (err, result) => {
        if (err) {
            console.log('Database error:', err);
            res.render('form/login_via_otp', { errorMsg: 'Server error', display: null });
        } else {
            console.log('Database result:', result);
            if (result.length > 0) {
                if(result[0].isActive == 1){
                    try {
                        console.log('Sending OTP to:', emailID);
                        const mailResult = await mailFunc.sendOtp(emailID);
                        if (mailResult.success) {
                            console.log('OTP sent successfully:', mailResult.otp);
                            req.session.otp = mailResult.otp;
                            req.session.applicantId = result[0].applicant_id;
                            res.render('form/verify_otp')
                        }
                    } catch (error) {
                        console.log('Mail error:', error);
                        res.render('form/login_via_otp', { errorMsg: 'Error sending email', display: null });
                    }
                }else{
                    console.log('Account is deactivated');
                    res.render('form/login_via_otp', { errorMsg: null, display: true });
                }
            } else {
                console.log('Email not found');
                res.render('form/login_via_otp', { errorMsg: 'Email not Found', display: null });
            }
        }
    });
})

router.post('/verify_otp', (req, res) => {
    const otp = req.session.otp;
    const enteredOtp = req.body.otp;

    console.log('OTP verification attempt');
    console.log('Session OTP:', otp);
    console.log('Entered OTP:', enteredOtp);

    if (otp === enteredOtp) {
        console.log('OTP verification successful');
        req.session.loggedIn = true;
        res.redirect('/jobSeeker?toastNotification=Logged In Successfully!');
    } else {
        console.log('OTP verification failed');
        res.render('form/login_via_otp', { errorMsg: 'Invalid OTP', display: null });
    }
});


router.get('/registration', (req, res) => {
    res.render('Form/applicant_registration', { errorMsg: null });
});

router.post('/registration', (req, res) => {
    const emailID = req.body.emailID;
    const username = req.body.username;
    const password = req.body.password;
    const con_password = req.body.con_password;
    const encPass = md5(password);

    // First, check if the emailID is in the ex_applicants table
    conn.query(`SELECT * FROM ex_applicants WHERE emailID = ?`, [emailID], (err, exResults) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }

        if (exResults.length > 0) {
            // Email is blocked
            return res.render('Form/applicant_registration', { errorMsg: 'EmailID blocked' });
        } else {
            // Check if the emailID already exists in the applicant_credentials table
            conn.query(`SELECT * FROM applicant_credentials WHERE emailID = ?`, [emailID], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Internal server error');
                }

                if (results.length > 0) {
                    res.render('Form/applicant_registration', { errorMsg: 'Email already exists' });
                } else {
                    if (password === con_password) {
                        const query = `INSERT INTO applicant_credentials (username, emailID, password) VALUES (?, ?, ?)`;
                        conn.query(query, [username, emailID, encPass], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).send('Internal server error');
                            } else {
                                const query = `SELECT * FROM applicant_credentials WHERE emailID = ? AND password = ? LIMIT 1`;
                                conn.query(query, [emailID, encPass], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        return res.status(500).send('Internal server error');
                                    }

                                    if (result.length > 0) {
                                      req.session.applicantId = result[0].applicant_id;
                                      req.session.email = result[0].emailID;
                                      res.redirect(
                                        "/jobSeeker/completeProfileForm"
                                      ); // define a GET route to render the form
                                    }
                                });
                            }
                        });
                    } else {
                        res.render('Form/applicant_registration', { errorMsg: 'Password and Confirm Password do not match' });
                    }
                }
            });
        }
    });
});

router.get('/forgot_password', (req, res) => {
    res.render('form/forgetpassword', { errorMsg: null })
});

router.post('/forgot_password', (req, res) => {
    const emailID = req.body.emailID;
    console.log("Email: " + emailID);

    conn.query(`SELECT * FROM applicant_credentials WHERE emailID = '${emailID}'`, async (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/jobSeeker/login');
        } else {
            if (result.length > 0) {
                try {
                    const mailResult = await mailFunc.sendOtp(emailID);
                    if (mailResult.success) {
                        req.session.femailID = emailID;
                        req.session.fotp = mailResult.otp;
                        res.render('form/verify_otp2');
                    }
                } catch (error) {
                    console.log(error);
                    res.send('Error sending email');
                }
            } else {
                res.render('form/forgetpassword', { errorMsg: 'Email does not exist' });
            }
        }
    });
});

router.post('/verify_otp_2', (req, res) => {
    const fotp = req.session.fotp;
    const enteredOtp = req.body.otp;

    if (fotp === enteredOtp) {
        res.redirect('/jobSeeker/reset_password');
    } else {
        res.render('form/forgetpassword', { errorMsg: 'Invalid OTP' });
    }
});

router.get('/reset_password', (req, res) => {
    res.render('form/reset_password', { errorMsg: null });
});

router.post('/reset_password', (req, res) => {
    var email = req.session.femailID;
    var con_password = req.body.con_password;
    var password = req.body.password;
    var encPass = md5(password);
    if (password === con_password) {
        conn.query('update applicant_credentials SET password = ? where emailID = ?', [encPass, email], function (error, results, fields) {
            if (error) {
                console.error("Error in reseting password");
                res.redirect('/jobSeeker/forgot_password');
            } else {
                res.redirect('/jobSeeker/login');
            }
        });
    } else {
        res.render('form/reset_password', { errorMsg: 'Password and Confirm Password do not match' });
    }
});




// Applicant Change Password
router.get('/changePassword', (req, res) => {
    res.render('form/change_password_form', {errorMsg: null});
});

router.post('/changePassword', (req, res) => {
    let oldPass = md5(req.body.oldPassword);
    const checkOldPass = 'SELECT password FROM applicant_credentials WHERE applicant_id = ?';
    conn.query(checkOldPass, [req.session.applicantId], (error, results)=>{
        if(error){
            console.log(err);
            return;
        }else{
            if(oldPass === results[0].password){
                let newPass = md5(req.body.newPassword);
                let confirmPass = md5(req.body.con_password);
                if(newPass === confirmPass){
                    const updatePass = 'UPDATE applicant_credentials SET password = ? WHERE applicant_id = ?';
                    conn.query(updatePass, [newPass, req.session.applicantId], (error, result2)=>{
                        if(error){
                            console.log(error);
                            return;
                        }else{
                            res.redirect('/jobSeeker/login');
                        }
                    });
                }else{
                    res.render('form/change_password_form', {errorMsg: 'passwords doesnot match'})
                }
            }else{
                res.render('form/change_password_form', {errorMsg: 'current Password is incorrect'});
            }
        }
    });
});


// logout route
router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/homepage');
});


module.exports = router;
