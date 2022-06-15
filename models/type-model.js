const {Schema, model} = require('mongoose');

const TypeSchema = new Schema({
    name: {type: String}
})

module.exports = model('Type', TypeSchema);
