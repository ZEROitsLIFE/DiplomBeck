const UserModel = require("../models/user-model");
const basketService = require("../service/basket-service");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const basket = require("../models/basket");
const user_info = require("../models/user_info");
const UsersDto = require("../dtos/service-dto");

class UserService {
  async registration(email, password, role) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Користувач з таким почтовим ящиком ${email} вже існує`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      role: role,
    });
    try {
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/user/activate/${activationLink}`
      );
    } catch (error) {
      console.log(error);
    }

    const userDto = new UserDto(user); // id, email, isActivated, role
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    console.log(userDto);
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;

    basketService.create(user._id);

    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Користуач з таким email не знайдено");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неправильний пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    console.log("refresh");
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    console.log(userData);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    console.log(tokenFromDb);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find({ isActivated: true });
    console.log(users);
    // const userDtвo = users.map(data=>{
    //   const baskets = await basket.findOne({user:data.id})

    //   console.log("MASKET",baskets)
    //
    // })
    const arr = [];
    const a = await Promise.all(
      users.map(async (data) => {
        console.log("qqqqqqqqq", data);
        const baskets = await basket.findOne({ user: data._id });
        console.log("ssssssssss", baskets);
        const userInfo = await user_info.findOne({ user_id: data._id });
        console.log("uuuuuuuuuu", userInfo);
        let baskt = baskets.id;
        let _id = data._id;
        let name = userInfo.first_name;
        let number = userInfo.phone_number;
        await arr.push({ baskt, _id, name, number });
      })
    );

    console.log("SSSSS", arr);
    return arr;
  }
}

module.exports = new UserService();
