//router
const routes = require("express").Router()
const areaController = require("../controller/AreaController")
routes.get("/adds",areaController.getArea)
routes.get("/getareabycityid/:cityId",areaController.getAreaByCityId)
routes.post("/add",areaController.addArea)
routes.delete("/deletearea",areaController.deleteArea)


module.exports = routes

