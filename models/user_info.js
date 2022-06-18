const {Schema, model} = require('mongoose');

const UserInfoSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User' },
    first_name: {type: String, required:true},
    phone_number: {type: String, unique: true, required:true},
    about: {type: String},
    // sex:{type: String, enum: ['Male', 'Female','ELSE'], default:'ELSE'}
})

module.exports = model('UserInfo', UserInfoSchema);

