// module.exports.login = async function (req, res) {
//     // console.log(req.headers);
//     // console.log(req.body);
//     try {
//         if (req.body.email == undefined || req.body.password == undefined) {
//             return res.status(201).json({
//                 failure: "Id or Password is empty",
//             })
//         } else {

//             const user = await userModel.find({ "email": req.body.email });
//             // const id=user[0]["_id"];
//             // const token=await jwt.sign({id},secretkey);
//             // console.log("hi"+"   "+user+" "+req.body.password);
//             if (user[0].password == req.body.password) {
//                 console.log("hi");  
//                 const id = user[0]["_id"];
//                 const token = await jwt.sign({ id }, secretkey);

//                 return res.status(201).json({
//                     success: "user login",
//                     // user,
//                     token
//                 })
//             } else {
//                 return res.status(201).json({
//                     failure: "password is incorrect",
//                 })
//             }
//         }
//     } catch (err) {
//         return res.status(401).json({
//             failure: "email is incorrect",
//             data: err
//         });
//     }
// }









const secretkey = "lkjldskjflaskfdndfsdjfhkasdfjbfmasndbjsdfmsnvZJcvajfn";
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt");
const emailSender = require("../utilities/email");
module.exports.signup = async function (req, res) {
    // console.log(req.body)
    const user = await userModel.create(req.body);

    const id = user["_id"];
    const token = await jwt.sign({ id }, secretkey);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).json({
        success: "user created",
        user,
        token
    })
}

module.exports.login = async function (req, res) {
    try {
        if (req.body.email == undefined || req.body.password == undefined) {
            return res.status(201).json({
                failure: "Id or Password is empty",
            })
        } else {

            const user = await userModel.findOne({ "email": req.body.email });
            const answer=await bcrypt.compare(req.body.params, user.password, function(err, res) {
                // res == true
            });
            if (answer) {
           
                // before using bcrypt
            // if (user.password == req.body.password) {
                // console.log("hi");
                const id = user["_id"];
                const token = await jwt.sign({ id }, secretkey);
                res.cookie("jwt", token, { httpOnly: true })
                // console.log(res.cookie.jwt);
                return res.status(201).json({
                    success: "user login",
                    token
                })
            } else {
                return res.status(201).json({
                    failure: "password is incorrect",
                })
            }
        }
    } catch (err) {
        return res.status(401).json({
            failure: "email is incorrect",
            data: err
        });
    }
}

module.exports.logout = function (req, res) {
    // console.log("hi")
    res.cookie("jwt", "kjsf", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.redirect("/");
}


module.exports.protectRoute = async function (req, res, next) {

    const token = req.cookies ? req.cookies.jwt : null || req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    // console.log(token);
    if (token) {
        try {
            const loggedin = await jwt.verify(token, secretkey);
            // console.log(loggedin);
            // if (loggedin)
            const user = await userModel.findOne({ "_id": loggedin.id });
            // console.log(user);
            req.role = user.role;
            req.decodedID = user["_id"];
            req.user = user;
            next();
            // else {
            //     return res.status(401).json({
            //         data: "Something went wrong please login again"
            //     });
            // }
        } catch{
            return res.status(401).json({
                data: "Something went wrong please login again"
            });
        }
    } else {
        res.redirect("/login");
    }
}

module.exports.isLoggedIn = async function (req, res, next) {

    const token = req.cookies ? req.cookies.jwt : null || req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    // console.log(token);
    if (token) {
        try {
            const loggedin = await jwt.verify(token, secretkey);
            // console.log(loggedin);
            // if (loggedin)
            const user = await userModel.findOne({ "_id": loggedin.id });
            // console.log(user);
            req.role = user.role;
            req.decodedID = user["_id"];
            req.user = user;
            next();
        } catch{
            next();
        }
    } else {
        next();
    }
}

module.exports.updatePassword = async function (req, res) {
    const user = req.user;
    if (req.body.password && req.body.confirmpassowrd && req.body.newpassowrd) {
        const prevPass = req.body.password;
        const newPass = req.body.newpassowrd;
        const confirmpassowrd = req.body.confirmpassowrd;
        
        // for security
        const answer=bcrypt.compare(user.password,prevPass,function(err,res){

        });
        if(answer){
            // before using dcrypt
        // if (user.password === prevPass) {
            user.password = newPass;
            user.confirmpassowrd = confirmpassowrd;
            user.save();
        }
    } else {
        return res.json({
            data: "Please enter correct input"
        })
    }
}

module.exports.forgetPassword = async function (req, res) {
    // 1 findOne --find user by email
    // console.log(req.body);
    try {
        const user = await userModel.findOne({ "email": req.body.email });
        // console.log(user);
        if (user) {
            // 2 add token property to that user
            const token = user.generateToken();
            // to avoid the confirm password validator check before
            await user.save({ validateBeforeSave: false });
            let options = {
                // from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Hello ✔,', // Subject line
                text: 'reset your password using this token token is=?' + token, // plain text body
                html: `<b>this is just testing mail and your token is=${token}</b>`// html body
            }
            await emailSender(options);
            return res.status(201).json({
                // data: "please go to your email for password reset"
                success:"success"
            })
        } else {
            return res.status(201).json({
                data: "this username does not exist"
            })
        }
    } catch{
        return res.status(401).json({
            data: "please enter the username"
        })
    }
}

module.exports.isAuthorized = function (values) {
    return function (req, res, next) {
        // console.log(values+"    "+req.role+"    ");
        if (values.includes(req.role)) {
            next();
        } else {
            return res.status(401).json({
                data: "You are not authorized"
            });
        }
    }
}

module.exports.resetPassword = async function (req, res) {
    // console.log(req.body);
    // console.log(req.params);
    if (req.body.confirmpassword && req.body.password) {

        try {
            const user = await userModel.findOne({ "token": req.params.token });
            // console.log(user);
            user.password = req.body.password;
            user.confirmpassword = req.body.confirmpassword;
            user.token = undefined;
            await user.save();

            return res.status(201).json({
                data: "passowrd updated successfully"
                // ,user
            })
        } catch{
            return res.json({
                data: "password and confirm Password must be same"
            })
        }
    } else {
        return res.json({
            data: "please enter password and confirm Password"
        })
    }

}