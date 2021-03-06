const {Schema, model} = require('mongoose');

const HistorySchema = new Schema({
    basket: {type: Schema.Types.ObjectId, ref: 'Basket'},
    service: {type: Schema.Types.ObjectId, ref: 'Service'},
    date: {type: Date },
    time:{ type: Number, },
    reserved : {type: Boolean, default: false},
    complited: {type: Boolean, default: false}

})

module.exports = model('History', HistorySchema);
