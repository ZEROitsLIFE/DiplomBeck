module.exports = class UserDto {
    email;
    id;
    isActivated;
    role;
    basket;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.role = model.role;
        this.basket = model.basket;
    }
}
