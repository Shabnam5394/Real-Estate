//router
const routes = require("express").Router()
const cityController = require("../controller/CityController")
routes.get("/getallcity",cityController.getCities)
routes.get("/getcitybystate/:stateId",cityController.getCityByStateId)
routes.post("/addcity",cityController.addCity)
routes.delete("/deletecity",cityController.deleteCity)



module.exports = routes

