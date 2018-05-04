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
    employee.findById(req.params.id, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        for(let i =0;i< data.services.length; i++){
            if(data.services[i]._id == req.params.idservice){
                data.services[i].done = req.body.done;
                data.services[i].delay = req.body.delay;
                data.services[i].delayed = req.body.delayed;
            }
        }
        data.markModified('services');
        data.save((err, data) => {
            if (err){
                return res.sendStatus(500)
            }
            return res.sendStatus(200)
        });
    })
});

module.exports = app;