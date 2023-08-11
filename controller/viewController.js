// we will update it soon.
const planModel = require("../model/planModel");
module.exports.homepage = async function (req, res) {
    const user=req.user;
    let plans = await planModel.find();
    // console.log(plans);
    plans = plans.slice(0, 3);
    // console.log("--------------------------------------")
    // console.log(plans);

    res.status(200).render("home.pug", {
        plans: plans,
        user
    });

    // try {
    // res.status(200).render("home.pug");
    // } catch (err) {  }
}

module.exports.planpage = async function (req, res) {
    const user=req.user;
    // try {
    var plans = await planModel.find();
    res.status(200).render("planPage.pug", { plans: plans,user });
    // } catch (err) {  }
}

module.exports.loginpage = async function (req, res) {

    res.status(200).render("logincontainer.pug");
}

module.exports.forgetpasswordpage = async function (req, res) {

    res.status(200).render("forgetpassword.pug");
}


module.exports.updatepage = async function (req, res) {

    res.status(200).render("updateprofile.pug");
}

module.exports.signuppage = async function (req, res) {

    res.status(200).render("signupcontainer.pug");
}

module.exports.profilepage=async function(req,res){
    
    res.status(200).render("me.pug",{user:req.user});
}
