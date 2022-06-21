const ApiError = require("../exceptions/api-error");
const UserInfoSchema = require("../models/user_info");

// const ValidateUSPhoneNumber = (phoneNumber) => {
//   var regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
//   var phone = phoneNumber.match(regExp);
//   if (phone) {
//     console.log("yes");
//     return true;
//   }
//   console.log("no");
//   return false;
// };

class UserinfoService {
  async createUserInfo(user_id, first_name, phoneNumber) {
    // const validNumber = ValidateUSPhoneNumber(phone_number);
    // if (!validNumber) {
    //   throw ApiError.BadRequest(`Номер ${phone_number} не валідний`);
    // }
    console.log(phoneNumber);
    const userInfo = await UserInfoSchema.create({
      user_id,
      first_name,
      phone_number: phoneNumber,
    });
    return { ...userInfo };
  }

  async findUserInfo(id) {
    if (!id) {
      throw ApiError.BadRequest(`Ід не задано`);
    }

    console.log(id);
    const data = UserInfoSchema.findOne({ user_id: id });
    if (!data) {
      ApiError.BadRequest(`Користувача не знайдено`);
    }

    return data;
  }

  async changeUserInfo(userid, number, name) {
    console.log(userid, number, name);
    let a = number;
    let b = name;
    const data = await UserInfoSchema.findOne({ user_id: userid });
    console.log(data);

    console.log(a, b);
    if (a === null) {
      a = data.phone_number;
    }
    if (b === null) {
      b = data.first_name;
    }
    console.log(a, b);

    await UserInfoSchema.updateOne({_id:data.id}, {
      phone_number: a,
      first_name: b,
    });

    const dataUpdate = await UserInfoSchema.findOne({ user_id: userid });
    console.log("first", dataUpdate);

    return dataUpdate;
  }

  async checkNumber(phone_number) {
    console.log(phone_number);
    if (!phone_number) {
      throw ApiError.BadRequest(`Номер не заданий`);
    }

    const userPhone = await UserInfoSchema.findOne({ phone_number });
    console.log(userPhone);
    try {
      if (userPhone.phone_number) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async getOneUsers(id) {
    const users = await UserInfoSchema.findOne({ user_id: id });
    return users;
  }
}

module.exports = new UserinfoService();
