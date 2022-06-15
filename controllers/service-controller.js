const service_service = require('../service/service-service')

class ServiceController {
    async create(req, res, next) {
        try {
            const {type, name, description, price} = req.body
            const service = await service_service.create(type, name, description, price)
            return res.json(service)
        } catch (error) {
            next(error)
        }
        
    }

    async getAll(req, res, next) {
        try {
            const service = await service_service.getService();
            return res.json(service)
        } catch (error) {
           next(error) 
        }
        
    }

    // async getOneService(req, res, next){
    //     try {
    //         const {id} = req.params
    //         const service = await service_service.getOneService(id);
    //         return res.json(service)
    //     } catch (error) {
    //        next(error) 
    //     }
    // }
}


module.exports = new ServiceController();
