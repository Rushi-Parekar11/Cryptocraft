const Router = require('express');
const router = Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../Models/UserModel'); // Replace with the correct path
const {signupValidation,loginValidation} = require("../Middelwares/AllValidations")

router.get('/',(req,res)=>{
    res.send('server is  running!');
  })
router.get('/ping',(req,res)=>{
  res.send('ping ok !');
})


router.post('/signup', signupValidation,async(req,res)=>{
    try {
       const {name,email,password} = req.body;
       const user = await UserModel.findOne({email});
       if(user){
        return res.status(409).json({message : 'user is Already exist,you can Login',success:false})
       }
       const userModel = new UserModel({name,email,password});
       userModel.password = await bcrypt.hash(password, 10);
       await userModel.save();
       res.status(201)
       .json({
        message:'Signup Successfully',
        success:true
       })
    } catch (error) {
      res.status(500)
      .json({
        message:'Internal Server error (Allroute.js)',
        success:false
       })
    }
})

router.post('/login',loginValidation,async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
     return res.status(403).json({message : 'email or Password is wrong',success:false})
    }
    const isPassEqual = await bcrypt.compare(password,user.password)
    if(!isPassEqual){
      return res.status(403)
      .json({message:"email or password is wrong",success:false});
    }
    const jwtToken = jwt.sign(
      {email:user.email,_id:user._id},
       process.env.JWT_SECRET,
       {expiresIn:'24h'}
    )
    res.status(200)
    .json({
     message:'login Successfully',
     success:true,
     jwtToken,
     email,
     name:user.name
    })
 } catch (error) {
   res.status(500)
   .json({
     message:'Internal Server error (Allroute.js)',
     success:false
    })
 }
})


router.post('/coin', async (req, res) => {
  const { name, coin } = req.body;
  if (!name || !coin) {
      return res.status(400).json({ error: 'Name and coin details are required' });
  }
  try {
      const user = await UserModel.findOne({ name });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      user.buycoins.push(coin);
      await user.save();
      res.status(200).json({ message: 'Coin added successfully', user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the coin' });
  }
});


router.get('/portfolio', async (req, res) => {
  const name = req.headers.username; // Get username from headers
  if (!name) {
      return res.status(400).json({ error: 'Username is required in headers' });
  }
  try {
      const user = await UserModel.findOne({ name: name });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({
          message: 'Portfolio data retrieved successfully',
          success: true,
          buycoins: user.buycoins,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'An error occurred while retrieving portfolio data' });
  }
});



module.exports=router;