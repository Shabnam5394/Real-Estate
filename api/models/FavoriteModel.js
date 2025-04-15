//database 
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    //fileds /// get

    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    propertiesId:{
        type:Schema.Types.ObjectId,
        ref:"Properties"
    },
    
},{
    timestamps:true
})

module.exports = mongoose.model("favorite",favoriteSchema)

//roles[roleSchema]