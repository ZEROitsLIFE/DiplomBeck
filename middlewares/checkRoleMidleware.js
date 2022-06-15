const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({message: "Немажє токена"})
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({message: "Не авторизован token"})
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(403).json({message: "Нет доступа: Невірний accessToken"})
        }
        
        if(userData.role !== role){
            return res.status(403).json({message: "Нет доступа"})        
        }

        req.user = userData;
        next();
        } catch (e) {
            res.status(401).json({message: e.message})
        }
    };
}



