const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  userlogin: (data) => {
    return new Promise(async (resolve, reject) => {
        try {
          const {Email,Password}=data
        let verifyEmail = await user.findOne({Email});
        if (verifyEmail) {
          let verifyPass = await user.findOne({Email,Password});
          if (verifyPass) {
            let accessToken = jwt.sign(
              { _id: verifyPass._id },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1d" }
              )
              
            await user.updateOne({ Email: Email }, { $set: { accessToken } });
            let username=Email.substring(0, Email.indexOf("@"))
            resolve({username,accessToken})
          }
          const error = new Error('Invalid email or password');
          error.status = 401
          throw error
        }
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      } catch (err) {
       
        reject(err);
      }
    });
  },
};
