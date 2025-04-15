const routes = require("express").Router()

const signup =require("../controller/AuthController.js")
const signin = require("../controller/AuthController.js")
const signOut=require("../controller/AuthController.js")

routes.post("/signup",signup.signup)
routes.post("/signin",signin.signin)
routes.post("/google",signin.google)
routes.get("/signout",signOut.signOut)
// routes.post("/signout",signOut.signOut)


module.exports = routes