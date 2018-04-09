const mongoose = require('mongoose');
const schema = mongoose.Schema;

const typeOfService = new schema ({
    nameTypeService: {type: 'String'},
    descType: {type: 'String'},
    averagePrice: {type: 'String'}
});

module.exports = mongoose.model('typeOfService', typeOfService);