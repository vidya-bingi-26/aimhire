const express = require('express');
const dbgetter = require('../DATABASE/dbGetter.js')
const upload = require('../FUNCTION/uploadSetup.js')
var router = express.Router();
const path = require('path')
const connection = require('../DATABASE/dbSetup.js');
const conn = connection();


router.post('/profileComplete', upload.single('prof-image'), (req, res) => {
    const applicant_id = req.session.applicantId;
    const email_id = req.session.email;
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const age = req.body.age;
    const mobile_no = req.body.phoneno;
    const exp = req.body.exp;
    const gender = req.body.gender;
    const profile_pic_code = req.file.filename;

    // Save profile data to DB
    const query = 'INSERT INTO job_applicant (applicant_id, first_name, last_name, age, mobile_no, email_id, exp_level, gender, profile_pic_code, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [applicant_id, first_name, last_name, age, mobile_no, email_id, exp, gender, profile_pic_code, ''];
    conn.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).send('Error saving profile: ' + err);
        }
        const profileData = {
            applicant_id: applicant_id,
            first_name: first_name,
            last_name: last_name,
            age: age,
            mobile_no: mobile_no,
            email_id: email_id,
            exp: exp,
            gender: gender,
            profile_pic_code: profile_pic_code
        };
        res.render('form/uploadForm', { pd: profileData });
    });
});


router.post('/updateProfile', upload.fields([{ name: 'prof-image', maxCount: 1 }, { name: 'prof-pdf', maxCount: 1 }]), (req, res) => {
    const applicant_id = req.body.applicant_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const mobile_no = req.body.mobile_no;
    const email_id = req.body.email_id;
    const exp = req.body.exp;
    const gender = req.body.gender;
    const skills = req.body.skills;
    const profilePic = req.body.profilePic;
    let profile_pic_code;
    if (req.files['prof-image'] && req.files['prof-image'][0]) {
        profile_pic_code = req.files['prof-image'][0].filename;
    } else {
        profile_pic_code = profilePic;
    }

    let cv;
    if (req.files['prof-pdf'] && req.files['prof-pdf'][0]) {
        cv = req.files['prof-pdf'][0].filename;
    } else {
        cv = req.body.cv; // fallback to existing CV value from form
    }

    const query = 'UPDATE job_applicant SET first_name = ?, last_name = ?, age = ?, mobile_no = ?, email_id = ?, skills = ?, exp_level = ?, gender = ?, cv = ?, profile_pic_code = ? WHERE applicant_id = ?';
    const values = [first_name, last_name, age, mobile_no, email_id, skills, exp, gender, cv, profile_pic_code, applicant_id];

    conn.query(query, values, (err, results) => {
        if (err) return res.send(err);
        res.redirect('/jobSeeker/applicant-dashboard');
    });
});


module.exports = router;