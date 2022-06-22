module.exports = class UsersDto {
    baskte_id;
    user_is;
    first_name;
    phone_number ; 

    constructor(model) {
        this.baskte_id = model.baskte_id;
        this.user_is = model.user_is;
        this.first_name = model.first_name;
        this.phone_number = model.phone_number;

    }
}