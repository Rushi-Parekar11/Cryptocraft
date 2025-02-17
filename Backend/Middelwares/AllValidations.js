const Joi = require('joi');

const signupValidation=(req,res,next)=>{
    const Schema = Joi.object({
        name:Joi.string().min(3).max(25).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(25).required()
    }); 

    const { error } = Schema.validate(req.body); 

    if(error){
        return res.status(400)
        .json({message:"Bad request(AllValidation.js)",error})
    }
    next();
}

const loginValidation=(req,res,next)=>{
    const Schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(25).required()
    }); 

    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request(AllValidation.js)",error})
    }
    next();
}

module.exports={
    signupValidation,
    loginValidation
}