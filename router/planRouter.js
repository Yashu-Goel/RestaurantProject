const express = require("express");
const planRouter = express.Router();
const {
    getAllPlan,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
    addqueryParams
} = require("../controller/planController");
const {protectRoute, isAuthorized} =require("../controller/authController");

planRouter
    .route("")
    .get(protectRoute,getAllPlan)
    .post(protectRoute,isAuthorized(["admin","gymowner"]),createPlan);
planRouter.route("/best-5-plans").get(protectRoute,addqueryParams, getAllPlan)
planRouter
    .route("/:id")
    .get(protectRoute,getPlan)
    .patch(protectRoute,isAuthorized(["admin","gymowner"]),updatePlan)
    .delete(protectRoute,isAuthorized(["admin","gymowner"]),deletePlan);
module.exports = planRouter;