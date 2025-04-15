//router
const routes = require("express").Router()
const categoryController = require("../controller/CategoryController")
routes.get("/getallcategory",categoryController.getCategory)
routes.post("/addcategory",categoryController.addCategory)
routes.delete("/deletecategory",categoryController.deleteCategory)

module.exports = routes

