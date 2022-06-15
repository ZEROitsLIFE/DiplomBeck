const ApiError = require('../exceptions/api-error');
const ServiceModel = require('../models/service')


class ServiceService {
    
    async create(type, name, description, price) {
        const servicePick = await ServiceModel.findOne({name: name});
        if (servicePick) {
             throw ApiError.BadRequest('Така послуга існує');
        }

        const service = await ServiceModel.create({type: type, name, description, price})
        return service
    }



    async getService() {
        const service = await ServiceModel.find();
        return service;
    }

    // async getOneService(id) {
    //     const service = await ServiceModel.findOne({_id: id})
    //     return service;
    // }
}

module.exports = new ServiceService();
