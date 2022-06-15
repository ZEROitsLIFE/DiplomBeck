const basket_service = require('../service/basket-service')

class BasketController {
    async create(req, res, next) {
        try {
            const { user_id} = req.body
            const basket = await basket_service.create( user_id)
            return res.json(basket)

        } catch (error) {
            next(error)
        }
        
    }

    async add(req, res, next) {
        try {
            const {history, user} = req.body
            console.log(history)
            console.log(user)
            const basket = await basket_service.buyService(history, user);
            return res.json(basket)
        } catch (error) {
           next(error) 
        }
        
    }

    async findAllHistoryUser(req, res, next) {
        try {
            const {user_id} = req.body
            const basket = await basket_service.findAll(user_id)
            return res.json(basket)
        } catch (error) {
           next(error) 
        }
    }

    async getUserById(req, res, next){
        try {
            const {id} = req.body;
            const basket = await basket_service.UserById(id)
            return res.status(200).json(basket)
        } catch (error) {
            
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


module.exports = new BasketController();
