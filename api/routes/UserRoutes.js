//router
const routes = require("express").Router()
//controller --> userController
const userController = require("../controller/UserController")
const propertiesController=require("../controller/PropertiesController")



routes.get("/users",userController.getAllUser)
// routes.post("/user",userController.addUser)

routes.post("/user",userController.addUser1)

routes.delete("/user/:id",userController.deleteUser)
routes.get("/user/:id",userController.getUserById)
routes.post("/user/login",userController.loginUser)
routes.put("/status/:id", userController.updateUserStatus);
routes.put("/update/:id",userController.updateUser)
routes.delete("/delete/:id",userController.deleteUser)
routes.get("/getUserProperty/:id",userController.getUserProperties)
routes.get("/:id",userController.getUser)
routes.delete('/deleteproperties/:id',propertiesController.deleteProperty)




module.exports = routes

