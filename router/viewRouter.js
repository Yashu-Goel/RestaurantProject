// we will update it soon

const express = require("express");
const viewRouter = express.Router();

const { homepage, planpage, loginpage, signuppage, profilepage,updatepage,forgetpasswordpage } = require("../controller/viewController");
const { protectRoute,logout,isLoggedIn } = require("../controller/authController");

viewRouter.use(isLoggedIn);


viewRouter
    .route("")
    .get(homepage)

viewRouter
    .route("/updateprofile")
    .get(updatepage)

viewRouter
    .route("/plan")
    .get(protectRoute, planpage)

viewRouter
    .route("/login")
    .get(loginpage)

viewRouter
    .route("/signup")
    .get(signuppage)

viewRouter
    .route("/me").get(protectRoute,profilepage);    

viewRouter
    .route("/logout").get(logout);    

viewRouter
    .route("/forgetpassword").get(forgetpasswordpage);

module.exports = viewRouter;