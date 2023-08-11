
const express=require("express");
const userRouter=express.Router();

const {createUser,getAllUsers,updateUser,getUser,checkInput,deleteUser,addQueryParams} = require("../controller/userController");
const {signup,login,protectRoute,isAuthorized,updatePassword,forgetPassword,resetPassword}=require("../controller/authController");

userRouter.post("/signup",signup);
userRouter.post("/login",login)
userRouter.post("/updateuser",protectRoute,updateUser);
userRouter.post("/forgetpassword",forgetPassword);
userRouter.post("/updatepassword",updatePassword);

userRouter
.route("")
.get(protectRoute,isAuthorized(["admin","gymowner"]),getAllUsers)
.post(protectRoute,checkInput,createUser);

userRouter.route("/best-5-users").get(addQueryParams,getAllUsers);

userRouter.route("/resetpassword/:token").patch(resetPassword);

userRouter
.route("/:id")
.get(protectRoute,getUser)
.patch(protectRoute,updateUser)
.delete(protectRoute,deleteUser);

module.exports=userRouter;