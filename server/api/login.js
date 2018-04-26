const express = require('express');
const user = require('../entities/user');

const app = express();

app.post("", (req, res) => {
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
            if (login.user === undefined || login.pass === undefined) {
                return res.send('Fields Nulls')
            } else {
                return res.sendStatus(403)
            }
        }
    })
});



module.exports = app;
