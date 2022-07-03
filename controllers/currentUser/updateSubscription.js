const { User } = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { subscription } = req.body;

    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing field subscription`,
      });
      const result = await User.findOneAndUpdate({ email }, { subscription });
      if (!result) {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found`,
        });
      }
      res.json({
        status: "success",
        code: 200,
        data: { result },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
