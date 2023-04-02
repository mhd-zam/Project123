const express = require("express");
const { userlogin, Finduser } = require("../controller/userHelper")
const user=require('../model/userModel')
const router = express.Router()
const jwt=require('jsonwebtoken')
require('dotenv').config()

router.post("/login", (req, res, next) => {
  userlogin(req.body.userDetails)
    .then(({username,accessToken}) => {
      res.cookie("Ent",accessToken, {httpOnly: true,secure: true,sameSite:"none",maxAge:60 * 1000})
      res.status(200).json({logged:true,username})
    })
    .catch((err) => {
      if (err.status === 401) {
        res.status(401).json({ message: "Invalid email or password" });
      } else if (err.status === 404) {
        res.status(404).json({ message: "User not found" });
      } else {
        next(err);
      }
    });
});

router.post("/verify", async (req, res, next) => {
  const auth = req.cookies
  console.log(auth)
  console.log("reached")
  if (!auth.Ent) {
    return res.sendStatus(401);
  }
  const token = auth.Ent
  let result = await user.findOne({ accessToken: token });
  if (!result) {
    res.clearCookie("Ent", { httpOnly: true });
    return res.sendStatus(401);
  }
  

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded._id
    res.status(200).send("ok");
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
})

module.exports = router;
