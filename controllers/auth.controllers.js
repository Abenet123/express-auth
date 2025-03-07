const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const UserModel = require('../models/index');

//get all users from the database

const registerUser = async (req, res) => {
   try {
    const formData = req.body;
    const {username, email, password, role}  = formData;

    if(!username ||!email || !password){
        res.status(301).json({
            success: false,
            message: "please fill out the form properly"
        })
    };
    const checkuserexist = await UserModel.findOne({$or: [{username}, {email}]});

    if(checkuserexist){
        return res.status(301).json({
            success: false,
            message: "user already exist"
        })
    }

   const salt = await bcryptjs.genSalt(10);
   const hashPassword = await bcryptjs.hash(password, salt);

   const userCreated = await UserModel.create({
    username,
    email,
    password: hashPassword,
    role: role || 'user'
   });
    if(userCreated){
       return res.status(200).json({
            success: true,
            message: "user created successfully"
        })
    } else {
        return res.status(404).json({
            success: false,
            message: "unable to create a user"
        })
    }
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "something went wrong with register a user"
    })
   }
}
const LoginUser = async (req, res) => {
   try{
       const loginInformation = req.body;
       const {email, password} = loginInformation

       //find and check users in the database

       const user = await UserModel.findOne({email});
       if(!user){
          return res.status(301).json({
            success: false,
            message: "user is not exist"
          })
       }

       //password matching

       const comparePassword = await bcryptjs.compare(password, user.password);
       if(!comparePassword){
        return res.status(404).json({
            success: false,
            message: "invalid creadential"
        })
       }
       //generate token 
       const tokenData = {email};
       const generatedToken = jwt.sign(tokenData, process.env.JWT_SECRETE_KEY, {expiresIn: "1d"});
       if(generatedToken){
        return res.status(200).json({
            success: true,
            message: "login successfuly",
            generatedToken
        })
       }
   } catch(error){
      console.log(error);
      return res.status(501).json({
        success: false,
        message: "somethign went wrong with login a user"
      })
   }
}

module.exports = {
    registerUser, 
    LoginUser,
}