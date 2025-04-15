//users table.. -->userModel
const UserModel = require("../models/UserModel");
const PropertyModel =require("../models/PropertiesModel");
const bcrypt = require("bcrypt");


const loginUser = async (req, res) => {
  //req.body email and password: password

  //password -->plain -->db -->encrypted
  //bcrypt  --> plain,enc --> match : true
  const email = req.body.email;
  const password = req.body.password;
  //select * from users where email =? and password = ?
  //userModel.find({email:email,password:password})
  //email --> object -->abc --{passwird:hashedPasseord}
  //normal passwoed compare -->

  //const foundUserFromEmail = userModel.findOne({email:req.body.email})
  const foundUserFromEmail = await UserModel.findOne({ email: email });
  console.log(foundUserFromEmail);
  //check if email is exist or not//
  if (foundUserFromEmail != null) {
    //password
    //normal -plain req.bodyy --- databse -->match  --> true | false
    //const isMatch = bcrypt.compareSync(req.body.password,foundUserFromEmail.password)
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    //true | false
    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};




const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // User ID from request params
    const { username, email, password } = req.body;
    
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10); // Hash password
    
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};




const addUser1 =async(req,res)=>{
  try{

    const createdUser = await UserModel.create(req.body)
    res.status(201).json({
        message:"user created..",
        data:createdUser
    })


  }catch(err){

    res.status(500).json({
      message:"error",
      data:err
    })

  }
}



//roleModel == roles
const getAllUser = async (req, res) => {
  //await....
  //select * from roleModel

  const users = await UserModel.find(); //[{}]

  res.json({
    message: "user fetched successfully",
    data: users,
  });
};

const addUser = async (req, res) => {
  //req.body,req.params,req.headers,req.query
  //console.log("request body....", req.body);
  //insert into roles () values()
  //database...
  const savedUser = await  UserModel.create(req.body)

  res.json({
    message:"user created...",
    data:savedUser
  });
};

const deleteUser = async(req,res)=>{

    const deletedUser = await UserModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"user deleted successfully..",
      data:deletedUser
    })



}

const getUserById = async (req,res)=>{

  //req.params.id

  const foundUser = await UserModel.findById(req.params.id)
  res.json({
    message:"role fatched..",
    data:foundUser
  })

}

const getUserProperties = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log("Fetching properties for user:", userId); // Debugging

    const userProperties = await PropertyModel.find({ userRef: userId });

    if (!userProperties.length) {
      return res.status(404).json({ message: "No properties found for this user." });
    }

    res.json({
      message: "User properties fetched successfully",
      data: userProperties,
    });
  } catch (error) {
    console.error("Error fetching user properties:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getUser=async (req,res)=>{
  try{

    const user =await UserModel.findById(req.params.id);

    if(!user) {
      res.status(404).json({message:"User not found."})
    }

    const {password: pass, ...rest}=user._doc;
    res.status(200).json(rest);

  }catch(err){
    console.log(err);

  }
}

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    // If user is approved, update all of their property listings
    if (status === "approved") {
      await PropertyModel.updateMany({ userRef: id }, { status: "approved" });
    }

    res.status(200).json({ message: "User status updated", data: updatedUser });
  } catch (err) {
    console.error("Error updating user status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




module.exports = {
  getAllUser,addUser,deleteUser,getUserById,addUser1,loginUser,updateUser,getUserProperties,getUser,updateUserStatus
};

//addUser
//getUser
//deleteUser
//getUserById


//exports