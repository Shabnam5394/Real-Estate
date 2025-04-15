//router
const routes = require("express").Router()
const agentdetailController = require("../controller/AgentDetailController")
routes.get("/getallagentdetail",agentdetailController.getagentdetail)
routes.post("/addagentdetail",agentdetailController.addagentdetail)
routes.delete("/deleteagentdetail",agentdetailController.deleteAgentDetail)


module.exports = routes

