import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';
const passport = require('passport');

exports.register = async(req: Request, res: Response)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }
    if(password.length < 8){
        return res.status(400).json({message: 'Password must be at least 8 characters long'});
    }
    const existinguser = await User.findOne({
        $or : [{
            username: username
        }, {
            email : email
        }]
    })
    if(existinguser){
        return res.status(400).json({message: 'Username or email already exists'});
    }
    const user = new User({
        username,
        email,
        password
    });
    await user.save();
    res.status(201).json({message: 'User registered successfully'});
}

exports.login = async(req: Request, res: Response)=>{
    
}

exports.logincallback = async(req: Request, res: Response)=>{ 
    // const existinguser = await User.findOne({
    //     $or : [{
    //         username: req.user?.username
    //     }, {
    //         email : req.user?["_json"].email
    //     }]
    // })
    const user =  (req.user as any).username;
    console.log("REQ.USER", user);
    res.send(req.user)
}

exports.logout = async(req : Request, res : Response, next : NextFunction)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
            return next(err);
        }
        res.redirect('/');
    });
}

exports.authCheck = async(req : Request, res : Response, next : NextFunction)=>{
    console.log(req.user)
}
