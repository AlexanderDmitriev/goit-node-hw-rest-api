/* const { User } = require("../../models/user"); */

const getCurrentUser = async(req, res, next) => {
    const {email} = req.user
    try {
        res.json({
            status: "success",
            code: 200,
            data: {user:{
                    email
            }}
        });
    } catch (error) {
        next(error);
    }
};


module.exports = getCurrentUser;