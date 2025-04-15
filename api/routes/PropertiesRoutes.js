//router
const routes = require("express").Router()
const propertiesController = require("../controller/PropertiesController.js")

routes.post("/addproperties",propertiesController.addProperties)
routes.put("/updateproperty/:id",propertiesController.updateProperty)
routes.get("/get/:id",propertiesController.getProperty)
routes.get("/get",propertiesController.getListings)

routes.put("/status/:id", propertiesController.updatePropertyStatus);
routes.get("/admin/reports", propertiesController.generateAdminReport);
routes.get("/admin/stats", propertiesController.getPropertyStats);
routes.get("/properties/:propertyId",propertiesController.getPropertyById)




//http://localhost:5000/properties/get/${listingId}


module.exports = routes

