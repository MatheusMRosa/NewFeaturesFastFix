const express = require('express');
const user = require('../entities/user');

const app = express();

app.post("", (req, res) => {
    const login = req.body;
    user.find({user: login.user, pass: login.pass}, {}, (err, data) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.session.user = data._id;
        req.session.save(() => {
            return res.send('Session Enable');
        }).catch(() => {
            return res.send('Session Disable');
        });
    })
});

module.exports = app;
