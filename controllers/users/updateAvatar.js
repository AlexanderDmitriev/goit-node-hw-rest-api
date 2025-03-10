const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const { Unauthorized } = require("http-errors");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    // Resize
    const imageAvatar = await Jimp.read(resultUpload);
    const resizeAvatar = await imageAvatar.resize(250,250);
    await resizeAvatar.write(resultUpload);
    
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new Unauthorized("Not authorized");
  }
};

module.exports = updateAvatar;
