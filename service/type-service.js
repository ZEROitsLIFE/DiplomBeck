const TypeDto = require("../dtos/type-dto");
const ApiError = require("../exceptions/api-error");
const TypeModel = require("../models/type-model");

class TypeService {
  async create(name) {
    const typeData = await TypeModel.findOne({ name });
    if (typeData) {
      throw ApiError.BadRequest("Такий тип існує");
    } else {
      const type = await TypeModel.create({ name: name });
      return type;
    }
  }

  async getAllType() {
    const type = await TypeModel.find();

    return type;
  }
}

module.exports = new TypeService();
