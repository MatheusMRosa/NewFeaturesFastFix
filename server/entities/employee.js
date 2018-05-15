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
            reasonDelay: {type: 'String'},
            delayed: {type: 'Boolean'},
            timeDoneHours: {type: 'Number'},
            timeDoneMinutes: {type: 'Number'},
        }
    ]
});

module.exports = mongoose.model('employee', employee);