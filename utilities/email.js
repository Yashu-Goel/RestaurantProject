

// we installed a package node mailer which we will be using for sending mail to the user/ clients
// and for testing purpose we are using mailtrap website which will help us to verify that we are 
// capable of sending mail or not... to check our website working properly...below are the steps for
// how to do this ...here we are assuming that the content used by this email..js file is sent by the
// one who is using / from another file where this function is being invoked...


const nodemailer = require("nodemailer");

module.exports = async function (options) {
    // create settings 
    


    try {
        var transport = nodemailer.createTransport({
            service:"gmail",
            host: "smtp.gmail.com",
            // port: 2525,
            auth: {
                user: "deepakpannu10@gmail.com",
                pass:  "itlfzkvvudrzgoeb-bb"         //"your password from gmail->accounts->app passwords->others->password"
            }
        })

        // email options
        const emailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: options.to, // list of receivers
            subject: options.subject,     //  'Hello ✔', // Subject line
            // text:     options.text  ,//'Hello world?', // plain text body
            html: options.html    // '<b>Hello world?</b>' // html body
        };

        await transport.sendMail(emailOptions);
    } catch{
        throw new Error(err);
    }




    // try {
    //     var transport = nodemailer.createTransport({
    //         host: "smtp.mailtrap.io",
    //         port: 2525,
    //         auth: {
    //             user: "80b8cfbd1d583a",
    //             pass: "5f5e3422e2ba4c"
    //         }
    //     });

    //     // email options
    //     const emailOptions = {
    //         from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //         to: options.to, // list of receivers
    //         subject: options.subject,     //  'Hello ✔', // Subject line
    //         // text:     options.text  ,//'Hello world?', // plain text body
    //         html: options.html    // '<b>Hello world?</b>' // html body
    //     };

    //     await transport.sendMail(emailOptions);
    // } catch{
    //     throw new Error(err);
    // }
}


// -------------------------------------------------------------------------------
// doing the same by using gmail but before doing this we need to switch on 2 step verification on 
// google account and after that go to app passwords and then select others and then copy password 
// after that we have this code instead of the above code..................
// module.exports = async function (options) {
//     // create settings 
//     try {
//         var transport = nodemailer.createTransport({
//             service:"gmail",
//             host: "smtp.gmail.com",
//             // port: 2525,
//             auth: {
//                 user: "deepakpannu10@gmail.com",
//                 pass: "your password from gmail->accounts->app passwords->others->password"
//             }
//         })

//         // email options
//         const emailOptions = {
//             from: '"Fred Foo 👻" <foo@example.com>', // sender address
//             to: options.to, // list of receivers
//             subject: options.subject,     //  'Hello ✔', // Subject line
//             // text:     options.text  ,//'Hello world?', // plain text body
//             html: options.html    // '<b>Hello world?</b>' // html body
//         };

//         await transport.sendMail(emailOptions);
//     } catch{
//         throw new Error(err);
//     }
// }