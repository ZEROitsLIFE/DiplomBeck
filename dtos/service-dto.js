module.exports = class ServiceDto {
    id
    type;
    name;
    description;
    price;

    constructor(model) {
        this.id = model.id;
        this.type = model.type;
        this.name = model.name;
        this.description = model.description;
        this.price = model.price;
    }
}
