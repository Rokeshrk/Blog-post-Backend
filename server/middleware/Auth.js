const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({message:'No token, authorization denied'});
    }

    try{
        jwt.verify(token,'jwtSecret',(error,decoded)=>{
            if(error){
                return res.status(401).json({message:'Token is not valid'});
            }else{
                req.user = decoded.user;
                next();
            }
        });

        }
        catch(error){
            console.error('error in auth middleware');
            res.status(500).json({message:'server error'});
        }
};
