//database 
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    //fileds /// get

    propertiesId:{
        type:Schema.Types.ObjectId,
        ref:"Properties"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String
    },
    status:{
        type:String
    }

},{
    timestamps:true
})

module.exports = mongoose.model("inquiry",inquirySchema)

//roles[roleSchema]