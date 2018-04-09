const express = require('express');
const authentication = require('express-authentication');

const app = express();

app.get('/api/login', authentication.required(), function(req, res) {
    res.status(200).send('Hello!');
});