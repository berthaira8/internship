import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/models/users.js";

export const Register=async(req,res)=>{
    try {
        const {password, ...userData}=req.body;
        const existing=await User.findOne({where:{email:userData.email}})
        if(existing)
            return res.status(404).json({message:"user/account already exist"});

        const hashPassword = await bcrypt.hash(password, 10);
        const userAccount=await User.create({...userData,password:hashPassword});
        res.status(201).json({message:"User account created successfully",userAccount});


    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

// Make Login
export const login=async(req,res)=>{
    try {
    const { email, password } = req.body;
        //check if user exists in the database
        const user=await User.findOne({where:{email}});
        
        if(!user)
            return res.status(404).json({message:"User try to login but there"})
        //hash password
        const hashPassword = await bcrypt.hash(password, 10);
        //compare user input and exist one

       const isMatch = await bcrypt.compare(hashPassword, user.password);
        if(!isMatch)
            return res.status(401).json({message:"Invalid credentials"});
        const token=jwt.sign(
            {id:user.id,role:user.role,fullName:user.fullName},
            process.env.JWT_SECRET,{expiresIn:'1d'}
        )
        res.status(200).json({message:"Login successfully",token});
     } catch (error) {
        res.status(500).json({error:error.message});

    }
}