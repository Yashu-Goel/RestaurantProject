// var express = require("express");
// var server = express();

// server.get("/",function(req,res){
//     res.status(201).json({
//         name:"steve",
//         NickName:"cap"
//     })
// })

// server.listen(3000,function(){
//     console.log("server is listening at port 3000");
// })

// const print=console.log;
// const express= require("express");
// const app=express();

// app.use(function(req,res){
//     const data="request processed successsfully"
//     res.status(200).json({
//         status:"successful",
//         data
//     });
// });

// app.listen(3000,function(){
//     print("server is listening at port number 3000");
// })
// /------------------------------
// for this send {"id":"rytuin"} from post man in post request and  in json format inside body ...
// const print=console.log;
// const express= require("express");
// const app=express();

// app.use(express.json());
// app.use(function(req,res,next){
//     const data="request processed successsfully"
//     // res.status(200).json({
//     //     status:"successful",
//     //     data
//     // });
//     var key=Object.keys(req.body)[0];
//     if(req.body[key]=="rytuin"){
//         req.name="vishal";
//     }
//     req.myProperty="i have modified the request";
//     next();
// });

// app.get("/",function(req,res){
//     const data="request processed successfully at home " + req.myProperty;
//     res.status(200).json({
//         status:"successful",
//         data
//     });
// })

// app.post("/",function(req,res){
//     const data="request processed successfully at home " + req.myProperty;
//     res.status(200).json({
//         status:"successful",
//         data
//     });
// })


// app.listen(3000,function(){
//     print("server is listening at port number 3000");
// })

//3rd question-----------------------------------
// this is same for all below codes except last one.

// const print = console.log;
// const express = require("express");
// const app = express();
// const fs = require("fs");

// app.use(express.json());


//-----------------------------------------------------------------------------------for plans

// complete this......

// const createPlan=function (req, res) {
//     const plan = JSON.parse(fs.readFileSync("./data/plan.json"));

//     // print(req.body);
//     req.body.id = user.length + 1;
//     user.push(req.body);
//     res.status(200).json({
//         status: "successful added new user",
//         data: user
//     });
//     fs.writeFileSync("./data/user.json", JSON.stringify(user));
// }

// const getAllUsers=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     res.status(200).json({
//         status: "successful",
//         data: user
//     });
// }

//  const updateUser = function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     const upcontent = req.body;
//     // print(upcontent);
//     for (const key in upcontent) {
//         user[req.params["id"] - 1][key] = upcontent[key];
//         // print(user[req.params["id"]-1][key]);
//     }
//     // print(req.body);
//     // user.push(req.body);
//     res.status(200).json({
//         status: "successful updated user",
//         data: user
//     });
//     // fs.writeFileSync("./data/user.json",JSON.stringify(user));
// }

// const getUser=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));
//     // console.log(req.params);
//     res.status(200).json({
//         status: "successful",
//         data: user[req.params["id"] - 1]
//     });
// }

// app.post("/api/user", createUser);

// app.get("/api/user", getAllUsers);

// app.patch("/api/user/:id", updateUser);

// app.get("/api/user/:id", getUser);





//-------------------------------------------------------------------------------for users

// const createUser=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     // print(req.body);
//     req.body.id = user.length + 1;
//     user.push(req.body);
//     res.status(200).json({
//         status: "successful added new user",
//         data: user
//     });
//     fs.writeFileSync("./data/user.json", JSON.stringify(user));
// }

// const getAllUsers=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     res.status(200).json({
//         status: "successful",
//         data: user
//     });
// }

//  const updateUser = function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     const upcontent = req.body;
//     // print(upcontent);
//     for (const key in upcontent) {
//         user[req.params["id"] - 1][key] = upcontent[key];
//         // print(user[req.params["id"]-1][key]);
//     }
//     // print(req.body);
//     // user.push(req.body);
//     res.status(200).json({
//         status: "successful updated user",
//         data: user
//     });
//     // fs.writeFileSync("./data/user.json",JSON.stringify(user));
// }

// const getUser=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));
//     // console.log(req.params);
//     res.status(200).json({
//         status: "successful",
//         data: user[req.params["id"] - 1]
//     });
// }

// app.post("/api/user", createUser);

// app.get("/api/user", getAllUsers);

// app.patch("/api/user/:id", updateUser);

// app.get("/api/user/:id", getUser);


// app.delete("/api/user/:id", function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));
//     const newUsers = deleteUser(user, req.params["id"]);
//     // print(req.params["id"]);
//     res.status(200).json({
//         status: "successful deleted user",
//         data: user
//     });
//     // fs.writeFileSync("./data/user.json",JSON.stringify(newUsers));
// })

// const deleteUser = function (users, delid) {
//     const newUsers = [];
//     for (var i = 0; i < users.length; i++) {
//         if (i < delid - 1) {
//             newUsers.push(users[i]);
//         }else if(i>delid+1){
//             const curuser=users[i];
//             curuser["id"]=curuser.id-1;
//             newUsers.push(curuser);
//         }
//     }
//     print(newUsers);
//     return newUsers;
// }


//--------------------------------------------------------------writing shortcut for upper part


// // do this similar for plans


// const createUser=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     // print(req.body);
//     req.body.id = user.length + 1;
//     user.push(req.body);
//     res.status(200).json({
//         status: "successful added new user",
//         data: user
//     });
//     fs.writeFileSync("./data/user.json", JSON.stringify(user));
// }

// const getAllUsers=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     res.status(200).json({
//         status: "successful",
//         data: user
//     });
// }

//  const updateUser = function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     const upcontent = req.body;
//     // print(upcontent);
//     for (const key in upcontent) {
//         user[req.params["id"] - 1][key] = upcontent[key];
//         // print(user[req.params["id"]-1][key]);
//     }
//     // print(req.body);
//     // user.push(req.body);
//     res.status(200).json({
//         status: "successful updated user",
//         data: user
//     });
//     // fs.writeFileSync("./data/user.json",JSON.stringify(user));
// }

// const getUser=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));
//     // console.log(req.params);
//     res.status(200).json({
//         status: "successful",
//         data: user[req.params["id"] - 1]
//     });
// }

// const deleteUser=function(req,res){

// }


// app.route("/api/user")
// .get(getAllUsers)
// .post(createUser);

// app.route("/api/user/:id")
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser);

// app.post("/api/user", createUser);

// app.get("/api/user", getAllUsers);

// app.patch("/api/user/:id", updateUser);

// app.get("/api/user/:id", getUser);

// app.delete("/api/user/:id",deleteUser);


// app.listen(3000, function () {
//     print("server is listening at port number 3000");
// })

//------------------------------------------------------------------------doing routing in this 

// do the same for plans

// const createUser=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     // print(req.body);
//     req.body.id = user.length + 1;
//     user.push(req.body);
//     res.status(200).json({
//         status: "successful added new user",
//         data: user
//     });
//     fs.writeFileSync("./data/user.json", JSON.stringify(user));
// }

// const getAllUsers=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     res.status(200).json({
//         status: "successful",
//         data: user
//     });
// }

//  const updateUser = function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     const upcontent = req.body;
//     // print(upcontent);
//     for (const key in upcontent) {
//         user[req.params["id"] - 1][key] = upcontent[key];
//         // print(user[req.params["id"]-1][key]);
//     }
//     // print(req.body);
//     // user.push(req.body);
//     res.status(200).json({
//         status: "successful updated user",
//         data: user
//     });
//     // fs.writeFileSync("./data/user.json",JSON.stringify(user));
// }

// const getUser=function (req, res) {
//     const user = JSON.parse(fs.readFileSync("./data/user.json"));
//     // console.log(req.params);
//     res.status(200).json({
//         status: "successful",
//         data: user[req.params["id"] - 1]
//     });
// }

// const deleteUser=function(req,res){

// }


// // do this similar for plans

// app.use("/api/user",userRouter);
// app.use("/api/plan",planRouter);

// const userRouter=express.Router();
// const planRouter=express.Router();






// userRouter
// .route("")
// .get(getAllUsers)
// .post(createUser);

// userRouter
// .route("/:id")
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser);

// app.post("/api/user", createUser);

// app.get("/api/user", getAllUsers);

// app.patch("/api/user/:id", updateUser);

// app.get("/api/user/:id", getUser);

// app.delete("/api/user/:id",deleteUser);



// app.listen(3000, function () {
//     print("server is listening at port number 3000");
// })

//----------------------------------now we are putting these handlers and other functionalities in specified folders i.e. controller and router

// do this similar for plans

const print = console.log;
const express = require("express");
const hpp=require("hpp");
const mongoSanitize=require("express-mongo-sanitize");
const rateLimiter=require("express-rate-limit");

const app = express();


const userRouter = require("./router/userRouter");
const planRouter = require("./router/planRouter");
const viewRouter = require("./router/viewRouter");
const bookingRouter = require("./router/bookingRouter");
const cookieparser = require("cookie-parser");


app.use(express.urlencoded({ extended: true }));

// for controlling parameter pollution i.e. many sort queries in a url params;
// app.use(hpp);
// to avoid queries in forms and request body;
// app.use(mongoSanitize);



// to avoid DOS-Denial of Service attack
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   });
   
  //  apply to all requests
  // app.use(limiter);

app.use(express.static("public"));
app.use(cookieparser());
app.set("view engine", "pug");
app.set("views", "views");

// app.get("/updateprofile",viewRouter)

// app.get("/me", viewRouter);
// app.get("/plan", viewRouter);
// app.get("/login",viewRouter);
// app.get("/forgetpassword",viewRouter);
// app.get("/signup",viewRouter);
// app.get("/logout",viewRouter);


// for using pug as above example change name of file index.html bcz server gives 
// priority to index and main file...  
app.use(express.json());

app.use("/", viewRouter);
app.use("/api/booking", bookingRouter)
app.use("/api/user", userRouter);
app.use("/api/plan", planRouter);
// app.use("/api/",)
module.exports = app;
