const mongoose = require('mongoose');
const schema = mongoose.Schema;

const employee = new schema({
    name: {type: 'String', required: true},
    services: [
        {
            descService: {type: 'String'},
            time: {type: 'String'},
            estimate: {type: 'String'},
            done: {type: 'Boolean'}
        }
    ]
});

module.exports = mongoose.model('employee', employee);