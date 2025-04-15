const FavoriteModel = require("../models/FavoriteModel");

// add state

const addFavorite = async(req,res)=>{
    try{
        const savedFavorite=await FavoriteModel.create(req.body);
        res.status(201).json({
            message:"state saved successfully",
            data:savedFavorite
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get state
const getFavorite= async(req,res)=>{
    try{
        const favorite= await FavoriteModel.find();
        res.status(200).json({
            message:" all states ",
            data:favorite
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}

const deleteFavorite = async(req,res)=>{

    //delete from roles where id =?
    //req.params
//    console.log(req.params.id) //prams object...

    const deletedFavorite = await FavoriteModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"user deleted successfully..",
      data:deletedFavorite
    })
}




module.exports={
    addFavorite,
    getFavorite,
    deleteFavorite
}