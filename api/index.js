// const express = require("express") //express....
// //express object..
// const app = express()

// //https://node5.onrender.com/user/user : domain + endpoints
// //http://localhost:3000/test
// app.get("/test",(req,res)=>{
    
//     console.log("test api called...")

//     res.send("hello test api called...")

// })

// //http://localhost:3000/users
// app.get("/users",(req,res)=>{

//     res.json({
//         message:"user api called...",
//         data:["ram","shyam","seeta"]
//     })
// })


// //http://localhost:3000/employee
// app.get("/employee",(req,res)=>{
//     res.json({
//         message:"employee api called...",
//         employees: [
//             {
//               id: 1,
//               name: "Amit Sharma",
//               position: "Software Engineer",
//               department: "IT",
//               email: "amit.sharma@example.com",
//               salary: 60000
//             },
//             {
//               id: 2,
//               name: "Neha Verma",
//               position: "HR Manager",
//               department: "Human Resources",
//               email: "neha.verma@example.com",
//               salary: 75000
//             },
//             {
//               id: 3,
//               name: "Rajesh Kumar",
//               position: "Data Analyst",
//               department: "Analytics",
//               email: "rajesh.kumar@example.com",
//               salary: 65000
//             },
//             {
//               id: 4,
//               name: "Priya Desai",
//               position: "Marketing Executive",
//               department: "Marketing",
//               email: "priya.desai@example.com",
//               salary: 55000
//             },
//             {
//               id: 5,
//               name: "Vikram Patel",
//               position: "Product Manager",
//               department: "Product",
//               email: "vikram.patel@example.com",
//               salary: 90000
//             }
//           ]
//     })

// })

// //server creation...
// const PORT = 3000
// app.listen(PORT,()=>{
//     console.log("server started on port number ",PORT)
// })
require("dotenv").config();
const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser =require("cookie-parser")



//express object..


const app = express()
app.use(cors())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json()) //to accept data as json...


app.use(cors({
    origin: "http://localhost:5173", // ✅ Set this to your frontend URL
    credentials: true // ✅ Allow sending cookies
  }));
  


//import role routes
const roleRoutes = require("./routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./routes/UserRoutes")
app.use("/api",userRoutes)

const usersRoutes = require("./routes/UserRoutes")
app.use("/api/user",usersRoutes)

const authRoutes = require("./routes/AuthRoutes")
app.use("/api/auth",authRoutes)

const areaRoutes = require("./routes/AreaRoutes")
app.use("/area",areaRoutes)

const bookingRoutes = require("./routes/BookingRoutes")
app.use("/booking",bookingRoutes)

const cityRoutes = require("./routes/CityRoutes")
app.use("/city",cityRoutes)

const stateRoutes = require("./routes/StateRoutes")
app.use("/state",stateRoutes)

const categoryRoutes = require("./routes/CategoryRoutes")
app.use("/category",categoryRoutes)

const agentdetailRoutes = require("./routes/AgentDetailRoutes")
app.use("/agentdetail",agentdetailRoutes)

const propertiesRoutes = require("./routes/PropertiesRoutes")
app.use("/properties",propertiesRoutes)

const propertyRoutes = require("./routes/PropertiesRoutes")
app.use("/api/properties",propertyRoutes)

const FavoriteRoutes = require("./routes/FavoriteRoutes")
app.use("/favorite",FavoriteRoutes)

const inquiryRoutes = require("./routes/InquiryRoutes")
app.use("/inquiry",inquiryRoutes)





mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 5000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})


//middleware error handler (1:45)