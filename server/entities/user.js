const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    typeUser: { type: 'Number', required: true },
    user: {
        type: 'String',
        required: true,
        unique: true
    },
    pass: { type: 'String', required: true }
});

module.exports = mongoose.model('user', user);