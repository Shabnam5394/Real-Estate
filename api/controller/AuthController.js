const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "SHABNAM05";

const signup = async (req, res) => {
  try {
    // Extract user details from request body
    const { username, email, password } = req.body;

    // 🔍 Check if username or email already exists
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    // 🔐 Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 🆕 Create a new user instance
    const newUser = new UserModel({ username, email, password: hashedPassword });

    // 💾 Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    // ⚠️ Handle unique constraint error from MongoDB
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or Email must be unique" });
    }

    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};





const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    // Sign JWT Token
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET);

    // Remove password before sending response
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const google = async(req,res)=>{
  try{

    const user = await UserModel.findOne({email:req.body.email})

    if(user){
      const token = jwt.sign({id:user._id},'AIzaSyDBiCyOFuMUEQqfnuzQsVKLXplmN-5cnT4')
      const {password: pass, ...rest} = user._doc
      res
        .cookie('access_token', token,{httpOnly:true})
        .status(200)
        .json(rest)
    }
    else{

      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcrypt.hashSync(generatedPassword,10);
      const newUser = new UserModel({username: req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email, password: hashedPassword, avatar:req.body.photo});
      await newUser.save();
      const token =jwt.sign({id: newUser._id},"AIzaSyDBiCyOFuMUEQqfnuzQsVKLXplmN-5cnT4");
      const {password: pass, ...rest}=newUser._doc;
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

    }

  }catch(err){

    res.status(500).json({ message: " error" });

  }
}




const signOut = async (req, res) => {
  try {
    res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: "None" }); // ✅ Clear JWT Cookie
    res.status(200).json({ message: "User has been logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error signing out", error: err.message });
  }
};

// ✅ Add signOut here



// const signOut =async(req,res)=>{
//   try{

//     res.clearCookie('access_token');
//     res.status(200).json('User has been logged out')

//   }catch(err){

//     res.status(500).json({ message: "error" });

//   }
// }





module.exports = { signup ,signin , google , signOut };
