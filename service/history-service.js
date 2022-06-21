const type = require("mongoose/lib/schema/operators/type");
const ApiError = require("../exceptions/api-error");
const basket = require("../models/basket");
const historyStore = require("../models/history-store");
const HistoryModel = require("../models/history-store");
const userModel = require("../models/user-model");
let history;
class HistoryService {
  async create(service, date, time) {
    const checkHistory = await HistoryModel.findOne({ date: date, time: time });

    if (checkHistory === null) {
      console.log("first");
      return (history = await HistoryModel.create({
        basket: null,
        service: service,
        date: date,
        time: time,
      }));
    } else {
      throw ApiError.BadRequest("Час зафйнятий");
    }

    // return null
  }

  async reserved(_id,user_id,basket_id) {
    console.log("id",_id)
    console.log("user_id",user_id)
    console.log("BAsket",basket_id)
    
    await HistoryModel.updateOne(
      { _id:_id },
      {basket: basket_id,reserved: true }
      );

    const hist = historyStore.findOne({_id:_id})  
      
      console.log("hist",hist.obj)
    return hist;
  }

  async compoled(_id) {
    const hist = await HistoryModel.updateOne(
      { _id: _id },
      { complited: true }
    );

    const history = historyStore.findOne({_id:_id})  
    console.log("Hist=>", hist);
    return history;
  }

  async isReserved(id) {
    const hist = await HistoryModel.findOne({ _id: id });
    if (hist.reserved) return true;
    return false;
  }

  async getHistory() {
    const checkHistory = await HistoryModel.find();
    return checkHistory;
  }

  async getHistoryOnReserved() {
    const checkHistory = await HistoryModel.find({ reserved: true });
    return checkHistory;
  }

  async getHistoryOnDate(date) {
    const checkHistory = await HistoryModel.find({ date: date });
    return checkHistory;
  }

  async getHistoryOnService(serviceId) {
    const checkHistory = await HistoryModel.find({ service: serviceId });
    return checkHistory;
  }
}

module.exports = new HistoryService();
