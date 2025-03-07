const UserModel = require('../models/index');

const getAllUsers = async (req, res) => {
   try {
       const allUsers = await UserModel.find({});
       if(!allUsers){
        return res.status(201).json({
            success: false,
            message: "can't fetch the users"
        })
       };
       return res.status(201).json({
        success: true,
        users: allUsers
       })
   } catch (error) {
    return res.status(401).json({
        success: false,
        message: `went wrong with fetch users ${error}`
    })
   }
};

module.exports = {getAllUsers}