const express = require('express');
const user = require('../entities/user');

const app = express();

app.post("", (req, res) => {
    const login = req.body;
    user.find({user: login.user, pass: login.pass}, {}, (err, data) => {
        if (data.length !== 0) {
            if (err) {
                return res.sendStatus(500)
            }
            req.session.user = data._id;
            req.session.save(() => {
                return res.send('Session Enable');
            })
        } else {
            if (login.user === undefined || login.pass === undefined) {
                return res.send('Fields Nulls')
            } else {
                return res.sendStatus(403)
            }
        }
    })
});



module.exports = app;
