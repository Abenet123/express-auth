const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
   try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(" ")[1];

      if(!token){
         return res.status(401).json({
            success: false,
            message: "token is not exist"
         })
      };

      //decode the token

      const decodedToken = jwt.verify(token, process.env.JWT_SECRETE_KEY);
      //console.log(decodedToken);
   } catch(error){
      console.log(error);
      return res.status(501).json({
         success: false,
         message: "something went wrong with auth middleware"
      })
   }
   next();
}

module.exports = authMiddleware

