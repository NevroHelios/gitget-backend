// import express from 'express';
// import cors from 'cors';

import { NextFunction, Request, Response } from "express";
import { User } from "./models/userModel";

const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require("express-session");
const axios = require('axios');
const cors = require('cors');
const app = express();
const {CLIENT_ID, CLIENT_SECRET} = require('./secrets.ts')
const connectToDatabase = require('../src/config/database');
console.log("CLIENT_ID", CLIENT_ID);

const authrouter = require('./routes/authRoutes');

const port = Number(process.env.PORT) || 3000;

// Enable CORS
app.use(cors());

let ACCESS_TOKEN = ''

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 600000,  
        expires: Date.now() + 600000,
        secure: true,
        httpOnly: true
    }
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user : any, done : any) {
    done(null, user);
});

passport.deserializeUser(function(user : any, done : any) {
    done(null, user);
});


async function main() {
    try {
        await connectToDatabase();
        app.listen(4001, () => {
            console.log('Server is running on port 4000');
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

main();

passport.use(new GitHubStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "http://localhost:4000/api/auth/github/callback"
    },
    async function(accessToken: string, refreshToken : null, profile : any, done : any) {
        process.nextTick(async function () {
            ACCESS_TOKEN = accessToken; 
            console.log("ACCESS TOKEN : ", accessToken);
            console.log("USER PROFILE : ", profile);
            const existinguser = await User.findOne({
                $or : [{
                    githubid : profile.id
                }, {
                    username : profile.username
                }]
            })
            if(existinguser){
                return done(null, existinguser);
            }
            const newuser = new User({
                githubid: profile.id,
                name : profile.displayName,
                username : profile.username,
                email : profile["_json"].email,
                password : accessToken,
                avatarUrl : profile["_json"].avatar_url,
                repos_url : profile["_json"].repos_url,
                bio : profile["_json"].bio? profile["_json"].bio : "No bio",
                role : 'USER',
                createdAt : profile["_json"].created_at,
                updatedAt : profile["_json"].updated_at
            })
            await newuser.save();
            return done(null, profile);
        });
    }
));

app.use('/api/auth', authrouter);

app.listen(4000, (req : Request, res : Response) => {
    console.log('Server is running on port 4000');
});

app.get('/', (req : Request, res : Response) => {
    res.send('Hello, world!');
});

// app.listen(port, '0.0.0.0', () => {
//     console.log(`Server is running on port ${port}`);
// });