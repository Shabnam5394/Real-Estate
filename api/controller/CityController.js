const CityModel = require("../models/CityModel");

// add city

const addCity = async(req,res)=>{
    try{
        const savedCity=await CityModel.create(req.body);
        res.status(201).json({
            message:"city saved successfully",
            data:savedCity
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get city
const getCity = async(req,res)=>{
    try{
        const cities= await CityModel.find().populate("stateId");
        res.status(200).json({
            message:" all cities ",
            data:cities
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}

const getCities= async(req,res)=>{
    try{
        const city= await CityModel.find();
        res.status(200).json({
            message:" all city ",
            data:city
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}


const getCityByStateId= async(req,res)=>{
    try{

        const  cities= await CityModel.find({stateId:req.params.stateId})
        res.status(200).json({
            message:" city found ",
            data:cities
        })
    }catch(err){
        res.status(500).json({
            message:"  city not found",
           
        })

    }
}

const deleteCity = async(req,res)=>{

    //delete from roles where id =?
    //req.params
//    console.log(req.params.id) //prams object...

    const deletedCity = await CityModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"user deleted successfully..",
      data:deletedCity
    })
}

module.exports={
    addCity,
    getCity,
    getCityByStateId,
    deleteCity,
    getCities
}