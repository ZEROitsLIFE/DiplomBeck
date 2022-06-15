const ApiError = require('../exceptions/api-error');
const historyService = require('../service/history-service');
const mailService = require('../service/mail-service')
const userModel = require('../models/user-model')
const HistoryModel = require('../models/history-store')
const BasketModel = require('../models/basket')



class BasketService {
    
    async create(id) {
       await BasketModel.create({user: id})
     }
     

    async buyService(_id, user_id) {
        const user = await userModel.findOne({_id: user_id})
        const basket = await BasketModel.findOne({user: user_id})
        const a =  await HistoryModel.findByIdAndUpdate({_id}, {basket: basket._id, reserved: true})
        // mailService.sendByuMail(user.email, a)
        return a
    }

    async findAll(id_user) {
        const basket = await BasketModel.findOne({user: id_user})
        const all = await HistoryModel.find({basket: basket._id})
      }

      async UserById(id) {
        const basket = await BasketModel.findOne({_id: id})
      return basket;
      }
}

module.exports = new BasketService();
