const mongoose = require('mongoose');
const schema = mongoose.Schema;

const products = new schema ({
    nameProduct: {type: 'String'},
    priceProduct: {type: 'String'}
});

module.exports = mongoose.model('product', products);