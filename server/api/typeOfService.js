const express = require('express');
const typeOfService = require('../entities/typeOfService');

const app = express();

app.get("", (req, res) => {
    typeOfService.find({}, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(data || [])
    })
});

app.get("/:id", (req, res) => {
    typeOfService.findById(req.params.id, {}, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(data || [])
    })
});

app.put("", (req, res) => {
    let _new = new typeOfService(req.body);
    _new.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(saved)
    })
});

app.delete("/:id", (req, res) => {
    //TODO fazer modificação para ativo e inativo
    typeOfService.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
});

app.post("/:id", (req, res) => {
    typeOfService.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
});

module.exports = app;