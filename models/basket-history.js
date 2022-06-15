const {Schema, model} = require('mongoose');

const BasketHistorySchema = new Schema({
    basket: {type: Schema.Types.ObjectId, ref: 'Basket'},
    histoty: {type: String, required: true},
})

module.exports = model('BascetHistory', BasketHistorySchema);
