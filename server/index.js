const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const user = require('./api/user');
const employee = require('./api/employee');
const login = require('./api/login');

const app = express();


app.use(session({
    //store: new FileStore({path: '/tmp/sessions'}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 86400000}
}));

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", ["OPTIONS", "GET", "POST", "DELETE", "PUT"]);

    if (req.method === "OPTIONS") {
        return res.send("ok")
    }

    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const auth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.sendStatus(403)
};

app.use("/api/user", user);

app.use('/api/login', login);

app.use('/api/employee', auth, employee);

app.listen(3030, '0.0.0.0', () => {

    console.log('He is alive');
    mongoose.connect('mongodb://fastfix:fastfix@ds036967.mlab.com:36967/fastfix', (err) => {
        if (err) {
            console.log("Failed: ", err)
        }
    });

});
