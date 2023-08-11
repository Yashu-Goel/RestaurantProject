const mongoose = require("mongoose");
const validator=require("validator");
const crypto=require("crypto");
// study bcrypt
const bcrypt=require("bcrypt");

const DB = "mongodb+srv://users:tonystark@cluster0-ll0cm.mongodb.net/test?retryWrites=true&w=majority";

mongoose
    .connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
    .then(function (conn) {
        // console.log(conn.connection);
        console.log("user db created");
    });

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is a required field"] },
    email: { type: String, required: [true, "E-mail is a required field"], validate:validator.isEmail },
    password: { type: String, required: [true, "Passowrd is a required field"] },
    role:{
        type:String,
        enum:["admin", "gymowner","user","deliveryperson"],
        default: "user"
    },
    token:String,
    confirmpassword: {
        type: String, required: [true, "Confirm Password is a required field"],
        validate: {
            validator: function(){
                return this.passworkd===this.confirmpassword;
            },
            message:" Password and confirm password must be same"
        }
    },
});

userSchema.pre("save" , async function(){
    // console.log("hi");

    await bcrypt.hash(this.password, 8, function(err, hash) {
        this.password=hash;
    });

    this.confirmpassword=undefined;
})

userSchema.method("generateToken",function(){
    const token=crypto.randomBytes(32).toString("hex");
    this.token=token;
    return token;
})

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;