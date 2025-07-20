const express = require('express');
const app = express();
const session = require("express-session");
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const md5 = require('md5');


const connection = require('./DATABASE/dbSetup.js');
const conn = connection();
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Import routes
const jobAuth = require('./ROUTES/authenRoutes.js');
const jobSeeker = require('./ROUTES/jobSeekerRoutes.js');
const jobCreator = require('./ROUTES/jobCreatorRoutes.js');
const jobProfile = require('./ROUTES/profileRoutes.js');
const admin = require('./ROUTES/adminRoutes.js');
const creatorAuth = require('./ROUTES/recruiterAuthenRoutes.js');


// setup middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setup static files  /views/
app.use('/function', express.static(path.join(__dirname, 'FUNCTION')));
app.use('/public', express.static(path.join(__dirname, 'PUBLIC')));

// setup viewing engine
app.set('views', path.join(__dirname, 'VIEWS'));
app.set('view engine', 'ejs');

// setup session


// setup routes
app.use('/jobSeeker', jobAuth);
app.use('/jobSeeker', jobSeeker);
app.use('/jobSeeker', jobProfile);

app.use('/jobCreator', creatorAuth);
app.use('/jobCreator', jobCreator);

app.use('/admin', admin);


// Serve dummy.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'VIEWS', 'applicant', 'openningPage.html'));
});

// Serve the homepage on a different route
app.get('/homepage', (req, res) => {
    const popularJobs = `SELECT jd.*
                        FROM job_details jd
                            JOIN (
                                SELECT job_id, COUNT(application_id) AS application_count
                                    FROM job_applications
                                GROUP BY job_id
                                    ORDER 
                                        BY application_count DESC
                                    LIMIT 6
                        ) top_jobs ON jd.job_id = top_jobs.job_id;`;

    conn.query(popularJobs, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        
        res.render('applicant/applicant_homepage', { r2: result, isLogged: req.session.loggedIn, toastNotification: null });
    });
});



app.listen(3200);


