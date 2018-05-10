const mongoose = require('mongoose');
const schema = mongoose.Schema;

const employee = new schema({
    name: {type: 'String', required: true},
    services: [
        {
            descService: {type: 'String'},
            time: {type: Date, default: Date.now},
            estimateHours: {type: 'Number'},
            estimateMinutes: {type: 'Number'},
            done: {type: 'Boolean'},
            delay: {type: 'String'},
            delayed: {type: 'Boolean'}
        }
    ]
});

module.exports = mongoose.model('employee', employee);