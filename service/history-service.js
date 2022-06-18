const type = require("mongoose/lib/schema/operators/type");
const ApiError = require("../exceptions/api-error");
const HistoryModel = require("../models/history-store");
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
      throw ApiError.BadRequest('Час зафйнятий')
    }

    // return null
  }

  async reserved(_id) {
    const hist = await HistoryModel.findByIdAndUpdate(
      { _id },
      { reserved: true }
    );
    console.log(hist);
    return hist;
  }


  async compoled(_id) {
    const hist = await HistoryModel.findByIdAndUpdate(
      { _id },
      { complited: true }
    );
    console.log(hist);
    return hist;
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

  async getHistoryOnDate(date) {
    const checkHistory = await HistoryModel.find({ date: date });
    return checkHistory;
  }

  async getHistoryOnReserved() {
    const checkHistory = await HistoryModel.find({ reserved: true });
    return checkHistory;
  }
}

module.exports = new HistoryService();
