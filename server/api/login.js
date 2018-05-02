const express = require('express');
const user = require('../entities/user');

const app = express();

app.get("", (req, res) => {
    if (req.session.user) {
        return res.send("Exist Session")
    } else {
        return res.sendStatus(500)
    }
});

const checkLogin = (req, res) => {
    const login = req.body;
    user.findOne({user: login.user, pass: login.pass}, {}, (err, data) => {
        if (data) {
            if (err) {
                return res.sendStatus(500)
            }
            console.log("login", req.session);
            console.log("login", data);
            req.session.user = data._id;
            res.send('OK')

        } else {
            req.session.tryCount = (req.session.tryCount || 1) * 2;
            if (login.user === undefined || login.pass === undefined) {
                return res.send('Fields Nulls')
            } else {
                return res.sendStatus(403)
            }
        }
    })
};

app.post("", (req, res) => {
    if (req.session && req.session.tryCount) {
        setTimeout(() => {
            checkLogin(req, res);
        }, req.session.tryCount * 1000)
    } else {
        checkLogin(req, res);
    }

});


module.exports = app;
