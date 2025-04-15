//database 
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    //fileds /// get

    categoryname:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    active:{
        type:Boolean
    }

})

module.exports = mongoose.model("category",categorySchema)

//roles[roleSchema]