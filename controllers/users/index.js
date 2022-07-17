const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("../users/verifyEmail");
const resendVerifyEmail = require("../users/resendVerifyEmail");

module.exports = {
  register,
  login,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
