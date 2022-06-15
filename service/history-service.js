const type = require('mongoose/lib/schema/operators/type');
const ApiError = require('../exceptions/api-error');
const HistoryModel = require('../models/history-store')


class HistoryService {
    
    async create(service, date, time) {
       const checkHistory = await HistoryModel.find({date: date, time: time})
       if(checkHistory){
           if(checkHistory.reserved)
           throw ApiError.BadRequest('Запис зайнятий');
       }

        const history = await HistoryModel.create({basket: null, service: service, date:date, time: time})
        
        return history;

    }

     async reserved(_id){
        
        const hist = await HistoryModel.findByIdAndUpdate({_id},{reserved: true})
        console.log(hist)
        return hist
     }

     async isReserved(id){
        
        const hist = await HistoryModel.findOne({_id: id})
        if(hist.reserved) return true     
        return false
     }

    async getHistory() {
        const checkHistory = await HistoryModel.find()
        return checkHistory
    }

    

    async getHistoryOnDate(date) {
        const checkHistory = await HistoryModel.find({date: date})
        return checkHistory
    }

    async getHistoryOnReserved() {
        const checkHistory = await HistoryModel.find({reserved: true})
        return checkHistory;
    }


}

module.exports = new HistoryService();
