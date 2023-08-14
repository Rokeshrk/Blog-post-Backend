const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const{check, validationResult}= require('express-validator');

const Users = require('../../models/User');

router.post('/',
check("name","Name is required").notEmpty(),
check("email","Email is required").isEmail(),
check("password","Enter password size greater than 6").isLength({min:6}),
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const{
        name,
        email,
        password
    }= req.body;

    try{
        let user = await Users.findOne({email})
        if(user){
            return res.status(400).json({errors: [{msg:'user already exists'}] })
        }

        user = new Users({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        await Users.save();

        const payload={
            user:{
                id: user.id,
            }
        };

        jwt.sign(
            payload,
            'jwtSecret',
            {expriesIn:'5 days'},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
        );
    }
    catch(err) {
        console.error(err);
        res.status(500).send('server error');
    }
    
}
);

exports.module=router;