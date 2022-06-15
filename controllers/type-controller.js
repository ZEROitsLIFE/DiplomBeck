const type_service = require('../service/type-service')

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const type = await type_service.create(name)
            return res.json(type)

        } catch (error) {
            next(error)
        }
        
    }

    async getAll(req, res, next) {
        try {
            const types = await type_service.getAllType();
            console.log(types)
            return res.json(types)
        } catch (error) {
           next(error) 
        }
        
    }
}


module.exports = new TypeController();
