const express = require('express');
const user = require('../entities/user');

const app = express();

app.get("", (req, res) => {
    user.find({}, { __v: false, pass: false }, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(data || [])
    })
});

app.get("/:id", (req, res) => {
    user.findById(req.params.id, {}, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(data || [])
    })
});

app.put("", (req, res) => {
    let _new = new user(req.body);
    _new.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(saved)
    })
});

app.delete("/:id", (req, res) => {
    //TODO fazer modificação para ativo e inativo
    user.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
});

app.post("/:id", (req, res) => {
    user.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
});

module.exports = app;
