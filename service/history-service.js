const type = require("mongoose/lib/schema/operators/type");
const ApiError = require("../exceptions/api-error");
const basket = require("../models/basket");
const historyStore = require("../models/history-store");
const HistoryModel = require("../models/history-store");
const service = require("../models/service");
const userModel = require("../models/user-model");
const mailService = require("./mail-service");
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

  async reserved(_id, user_id, basket_id) {
    console.log("id", _id);
    console.log("user_id", user_id);
    console.log("BAsket", basket_id);
    const history = await HistoryModel.findById({_id})
    if(history.reserved===true){
      throw ApiError.BadRequest('Послуга уже зарезервована')
    }
    else{
      await HistoryModel.updateOne(
        { _id: _id },
        { basket: basket_id, reserved: true }
      );
  
      const serviceId=history.service
      const user = await userModel.findById({_id: user_id });
      const services = await service.findById({ _id: history.service })
  
      await mailService.sendByuMail(user.email,service.name,history.time,history.date.toISOString().split('T')[0]);
  
      const hist = await historyStore.findOne({ _id: _id });
  
      console.log("date", history.date);
      console.log("histtoru", services);
      console.log("histtoru", user);
      console.log("histtoru", history);
      console.log("hist", hist);
      return hist;
    }

    
  }

  async compoled(_id) {
    const hist = await HistoryModel.updateOne(
      { _id: _id },
      { complited: true }
    );

    const history = historyStore.findOne({ _id: _id });
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
