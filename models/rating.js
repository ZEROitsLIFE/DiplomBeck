const { Double } = require('mongodb');
const {Schema, model} = require('mongoose');

const RatingSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    service: {type: Schema.Types.ObjectId, ref: 'Service'},
    rate: {type: Double, default: 0},
})

module.exports = model('BscetHistory', BasketHistorySchema);
