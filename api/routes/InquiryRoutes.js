//router
const routes = require("express").Router()
const inquiryController = require("../controller/InquiryController")
routes.get("/getallinquiry",inquiryController.getInquiry)
routes.post("/addinquiry",inquiryController.addInquiry)
routes.delete("/deleteinquiry",inquiryController.deleteInquiry)

module.exports = routes

