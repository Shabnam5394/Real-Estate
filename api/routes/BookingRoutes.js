const routes = require("express").Router()
const bookingController = require("../controller/BookingController")

routes.post("/create", bookingController.createBooking);
routes.get("/check", bookingController.checkIfBooked);
routes.get("/owner/:ownerId", bookingController.getBookingsForOwner);


module.exports = routes