const planModel = require("../model/planModel");

// private key
const stripe = require('stripe')('sk_test_ulPi434ipq5a0AuTLFaxHj0B009qt36zRa');


module.exports.checkout = async function (req, res) {
    // console.log(req.body);
    try {
        const plan = await planModel.findById({ "_id": req.body.id });
        console.log(plan.description);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                name: plan.name,
                description: plan.description,
                amount: plan.price *100,
                currency: 'inr',
                quantity: 1,
            }],
            success_url: 'http://localhost:3000',
            cancel_url: 'https://localhost:3000',
        });
        console.log(session);
        res.status(200).json({
            success: "plan payment kro",
            data: plan,
            session
        });
    } catch(err){
        console.log(err);
        res.status(200).json({
            failed: "failed"
        });
    }
}


