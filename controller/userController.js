// const fs = require("fs");
// const user= require("../model/userModel");

// // updated as now we will use database for storing information

// module.exports.createUser = function (req, res) {
//     // const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     // print(req.body);
//     // req.body.id = user.length + 1;
//     user.push(req.body);
//     res.status(200).json({
//         status: "successful added new user",
//         data: user
//     });
//     fs.writeFileSync("./data/user.json", JSON.stringify(user));
// }

// module.exports.getAllUsers = function (req, res) {
//     // const user = JSON.parse(fs.readFileSync("./data/user.json"));

//     res.status(200).json({
//         status: "successful",
//         data: user
//     });
// }

// module.exports.updateUser = function (req, res) {
//     // const user = JSON.parse(fs.readFileSync("./data/user.json"));

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
// module.exports.getUser = function (req, res) {
//     // const user = JSON.parse(fs.readFileSync("./data/user.json"));
//     // console.log(req.params);
//     res.status(200).json({
//         status: "successful",
//         data: user[req.params["id"] - 1]
//     });
// }
// module.exports.checkInput = function (req, res, next) {
//     if (req.body) {
//         if (req.body.name) {
//             next();
//         } else {
//             return res.status(400).json({
//                 status: "failed",
//                 data: "enter a name to create a user"
//             })

//         }
//     } else {
//         return res.status(400).json({
//             status: "failed",
//             data: "you should enter some details to create user"
//         })
//     }
// }
// module.exports.deleteUser = function (req, res) {

// }


//--------------------------doing all by database now instead of filesystem---------------------------------
const userModel = require("../model/userModel");

// updated as now we will use database for storing information

module.exports.createUser = async function (req, res) {
    try {
        // console.log(req.body);
        const user = await userModel.create(req.body);
        res.status(200).json({
            status: "successful added new user",
            data: user
        });
    } catch (err) {
        res.status(200).json({
            status: "can't add new user",
            data: errr
        });
    }
}

// what we need to implement greater than , less than, sort, limit, pagination
// applyied advanced filtering here

module.exports.addQueryParams = function (req, res, next) {
    req.query.sort = "averageratings";
    req.query.limit = 5;
    next();
}

module.exports.getAllUsers = async function (req, res) {
    var requiredQuery = { ...req.query };
    var excludedQueryOrEntities = ["sort", "page", "select", "limit"];

    for (var i = 0; i < excludedQueryOrEntities.length; i++) {
        delete requiredQuery[excludedQueryOrEntities[i]];
    }
    // console.log(requiredQuery);
    // console.log(req.query);
    var stringQuery = JSON.stringify(requiredQuery);
    stringQuery = stringQuery.replace(/lt|gt|gte|lte/g, function (match) {
        return `$${match}`;  // equivalent to "$"+match;
    });
    var query = JSON.parse(stringQuery);

    var pageOptions = {
        page: Number(req.query.page) || 0,
        limit: Number(req.query.limit) || 4,

    }

    var toskip = pageOptions.limit * pageOptions.page;
    var baseusers = userModel.find(query).skip(toskip).limit(pageOptions.limit);

    // sort

    if (req.query.sort) {
        // sorting if we use '-' it will sort in decending order.
        baseusers = baseusers.sort(`-${req.query.sort}`);
    }

    if (req.query.select) {
        const selectionCriteria = req.query.select.split("%").join(" ");
        // console.log(selectionCriteria);
        baseusers = baseusers.select(selectionCriteria);
    }
    // if (req.query.page) {
    // }
    // if (req.query.limit) {
    //     baseusers = baseusers
    // }
    // console.log(baseusers);

    var allusers = await baseusers;
    res.status(200).json({
        status: "successful get all users",
        data: allusers
    });
}

module.exports.updateUser = async function (req, res) {

    try {
        // console.log(req.body);
        const id = req.params.id || req.user["_id"];
        // console.log(req.user["_id"]);
        // console.log(id);
        
        
        const updateduser= await userModel.findByIdAndUpdate(id, req.body,{ new: true});
        console.log(updateduser);
        // const updateduser = await userModel.findOne({ _id: req.decodedID });
        res.redirect("/me");
        // res.status(200).json({
        //     status: "successful updated user",
        //     data: updateduser
        // });
        // console.log(updateduser);
    } catch (err) {
        // res.status(200).json({
        //     status: "can't update user",
        //     data: err
        // });
        res.redirect("/me");
    }
}

module.exports.getUser = async function (req, res) {
    // const user = JSON.parse(fs.readFileSync("./data/user.json"));
    // console.log(req.params);

    try {
        const singleuser = await userModel.findById(req.params.id);

        res.status(200).json({
            status: "successful got 1 user",
            data: singleuser
        });
    } catch (err) {
        res.status(200).json({
            status: "can't get user.",
            data: errr
        });
    }
}
module.exports.checkInput = function (req, res, next) {
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            return res.status(400).json({
                status: "failed",
                data: "enter a name to create a user"
            })

        }
    } else {
        return res.status(400).json({
            status: "failed",
            data: "you should enter some details to create user"
        })
    }
}

module.exports.deleteUser = async function (req, res) {

    try {
        const deletedsingleuser = await userModel.deleteOne(req.params.id);
        res.status(200).json({
            status: "deleted successful",
            data: deletedsingleuser
        });
    } catch (err) {
        res.status(200).json({
            status: "can't delete user",
            data: err
        });
    }
}
