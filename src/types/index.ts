// src/types/index.ts

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface UserResponse {
    user: User;
    token: string;
}

export interface ErrorResponse {
    message: string;
    statusCode: number;
}