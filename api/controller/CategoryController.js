const CategoryModel = require("../models/CategoryModel");

// add state

const addCategory = async(req,res)=>{
    try{
        const savedCategory=await CategoryModel.create(req.body);
        res.status(201).json({
            message:"state saved successfully",
            data:savedCategory
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get state
const getCategory= async(req,res)=>{
    try{
        const category= await CategoryModel.find();
        res.status(200).json({
            message:" all states ",
            data:category
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}
const deleteCategory = async(req,res)=>{

    //delete from roles where id =?
    //req.params
//    console.log(req.params.id) //prams object...

    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"user deleted successfully..",
      data:deletedCategory
    })
}


module.exports={
    addCategory,
    getCategory,
    deleteCategory
}