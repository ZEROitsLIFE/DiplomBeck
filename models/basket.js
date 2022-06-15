const {Schema, model} = require('mongoose');

const BasketSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
})

module.exports = model('Basket', BasketSchema);
