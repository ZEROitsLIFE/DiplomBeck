const {Schema, model} = require('mongoose');

const ServiceSchema = new Schema({
    type: {type: Schema.Types.ObjectId, ref: 'Type'},
    name: {type: String},
    description: {type: String},
    price: {type: Number}

})

module.exports = model('Service', ServiceSchema);
