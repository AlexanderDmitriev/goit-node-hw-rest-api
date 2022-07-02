const {User} = require("../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
// Импорт параметра из переменных окружения
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const {bearer, token} = authorization.split(' ');
    
    try {
        if(bearer !== "Bearer"){
            throw new Unauthorized("not Bearer");
        };
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = User.findById(id);
        if (!user){
            throw new Unauthorized("no user");
        };
        req.user = user;
        next();
    } catch (error) {
        if(error.message === "Invalid signature"){
            error.status = 401;
        }
        next(error);
    }
    
};

module.exports = auth