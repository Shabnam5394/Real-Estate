const InquiryModel = require("../models/InquiryModel");

// add state

const addInquiry = async(req,res)=>{
    try{
        const savedInquiry=await InquiryModel.create(req.body);
        res.status(201).json({
            message:"state saved successfully",
            data:savedInquiry
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get state
const getInquiry= async(req,res)=>{
    try{
        const inquiry= await InquiryModel.find();
        res.status(200).json({
            message:" all states ",
            data:inquiry
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}

const deleteInquiry = async(req,res)=>{

    //delete from roles where id =?
    //req.params
//    console.log(req.params.id) //prams object...

    const deletedInquiry = await InquiryModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"user deleted successfully..",
      data:deletedInquiry
    })
}


module.exports={
    addInquiry,
    getInquiry,
    deleteInquiry
}