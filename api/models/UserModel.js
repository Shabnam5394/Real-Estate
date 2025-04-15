const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        default:"https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png"
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'blocked'],
        default: 'pending'
    }
    

},{
    timestamps:true
})

userSchema.index({ username: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("users",userSchema)