const history_service = require("../service/history-service");

class HistoryController {
  async create(req, res, next) {
    try {
      const { service, date, time } = req.body;
      const history = await history_service.create( service, date, time)
console.log("History>",history)
      return res.json(history)
      console.log("Service", { service, date, time });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const history = await history_service.getHistory();
      return res.json(history);
    } catch (error) {
      next(error);
    }
  }

  async reserved(req, res, next) {
    try {
      const { id } = req.body;
      const history = await history_service.reserved(id);
      return res.json(history);
    } catch (error) {
      next(error);
    }
  }
  
  async complited(req, res, next) {
    try {
      const { id } = req.body;
      const history = await history_service.compoled(id);
      return res.json(history);
    } catch (error) {
      next(error);
    }
  }

  async isReserved(req, res, next) {
    try {
      const { id } = req.body;
      const history = await history_service.isReserved(id);
      return res.json(history);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HistoryController();
