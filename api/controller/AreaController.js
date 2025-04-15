const AreaModel = require("../models/AreaModel");


// add area

const addArea = async(req,res)=>{
    try{
        const savedArea=await AreaModel.create(req.body);
        res.status(201).json({
            message:"area saved successfully",
            data:savedArea
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get area
const getArea = async(req,res)=>{
    try{
        const areas= await AreaModel.find().populate("cityId").populate("stateId");
        res.status(200).json({
            message:" all areas ",
            data:areas
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


const getAreaByCityId=async(req,res)=>{
    try{

        const areas= await AreaModel.find({cityId:req.params.cityId})
        res.status(200).json({
            message:"  area found ",
            data:areas
        })
    }catch(err){

        res.status(500).json({
            message:"  area not found ",
           
        })
    }
}

const deleteArea = async(req,res)=>{

    //delete from roles where id =?
    //req.params
//    console.log(req.params.id) //prams object...

    const deletedArea = await AreaModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"user deleted successfully..",
      data:deletedArea
    })
}

module.exports={
    addArea,
    getArea,
    getAreaByCityId,
    deleteArea
}