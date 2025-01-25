// src/types/index.ts
import {UserInterface} from "../models/userModel";

export interface AuthRequest {
    username: string;
    password: string;
}

export interface UserResponse {
    user: UserInterface;
    token: string;
}

export interface ErrorResponse {
    message: string;
    statusCode: number;
}