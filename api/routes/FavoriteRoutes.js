//router
const routes = require("express").Router()
const favoriteController = require("../controller/FavoriteController")
routes.get("/getallfavorite",favoriteController.getFavorite)
routes.post("/addfavorite",favoriteController.addFavorite)
routes.delete("/deletefavorite",favoriteController.deleteFavorite)


module.exports = routes

