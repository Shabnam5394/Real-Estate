//database 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentdetailSchema = new Schema({
    //fileds /// get

    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    licenseNo:{
        type:String,
    },
    agencyName:{
        type:String,
    },
    experienceYears:{
        type:Number
    },
    address:{
        type:String
    }

})

module.exports = mongoose.model("agentdetail",agentdetailSchema)

//roles[roleSchema]