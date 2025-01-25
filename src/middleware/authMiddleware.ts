import { NextFunction, Request, Response } from "express";

exports.isloggedin = async(req : Request, res : Response, next : NextFunction) => {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}