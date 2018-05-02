const express = require('express');
const employee = require('../entities/employee');

const app = express();

app.get("", (req, res) => {
    employee.find({}, null, {sort: {name: 1}}, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(data || [])
    })
});

app.get("/:id", (req, res) => {
    employee.findById(req.params.id, {}, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(data || [])
    })
});

app.put("", (req, res) => {
    let _new = new employee(req.body);
    _new.save((err, saved) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(saved)
    })
});

app.delete("/:id", (req, res) => {
    employee.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
});

app.post("/:id", (req, res) => {
    employee.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
});

app.post("/:id/:idservice", (req, res) => {
    employee.findByIdAndUpdate(req.params.id, {"services.idservice": {done: req.body.done, delay: req.body.delay}}, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        console.log(req.body)
        console.log(data);
        return res.sendStatus(200)
    })
});

module.exports = app;