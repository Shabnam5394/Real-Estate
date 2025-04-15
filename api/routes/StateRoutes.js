//router
const routes = require("express").Router()
const stateController = require("../controller/StateController")
routes.get("/getallstates",stateController.getState)
routes.post("/addstate",stateController.addState)
routes.delete("/deletestate",stateController.deleteState)


module.exports = routes

