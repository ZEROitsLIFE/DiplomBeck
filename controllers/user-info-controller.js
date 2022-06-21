const info_service = require("../service/user-info");

class HistoryController {
  async chekPhone(req, res, next) {
    try {
      const { Number } = req.body;
      const chek = await info_service.checkNumber(Number);
      console.log(chek);
      return res.json(chek);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo(req, res, next) {
    try {
      const { id } = req.body;
      const data = info_service.findUserInfo(id);
      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
 
 
  async chamgeUserInfo(req, res, next) {
    try {
      const { user_id, number,name } = req.body;
    const info = await info_service.changeUserInfo(user_id, number,name)
   console.log(info)
      return res.json(info);
    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = new HistoryController();
