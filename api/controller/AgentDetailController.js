const AgentDetailModel = require("../models/AgentDetailModel");

// add state

const addagentdetail = async(req,res)=>{
    try{
        const savedAgentDetail=await AgentDetailModel.create(req.body);
        res.status(201).json({
            message:"state saved successfully",
            data:savedAgentDetail
        })
    }catch(err){
        res.status(500).json({
            message:err
        })
    }
};


//get state
const getagentdetail= async(req,res)=>{
    try{
        const agentdetail= await AgentDetailModel.find();
        res.status(200).json({
            message:" all states ",
            data:agentdetail
        })

    }catch(err){
        res.status(500).json({
            message:err
        })

    }
}

const deleteAgentDetail = async(req,res)=>{

    //delete from roles where id =?
    //req.params
//    console.log(req.params.id) //prams object...

    const deletedAgentDetail = await AgentDetailModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"user deleted successfully..",
      data:deletedAgentDetail
    })
}


module.exports={
    addagentdetail,
    getagentdetail,
    deleteAgentDetail
}