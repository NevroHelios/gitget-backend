import mongoose, { Schema, Document } from 'mongoose';

export interface Commit extends Document{
    message : string;
    date : Date;
}   

export interface Post extends Document{
    readme : string;
    insta_utube : string;
    linkedin : string;
}

export interface UserInterface extends Document {
    githubid : string;
    name? : string;
    username: string;
    email?: string;
    password: string; //access token
    avatarUrl? : string;
    repos_url : string;
    bio? : string;
    role : string;
    createdAt: Date;
    updatedAt: Date;
    commit : Commit[];
    posts : Post[];

}

const CommitSchema : Schema<Commit> = new Schema({
    message : {
        type : String,
        required: true,
    },
    date : {
        type : Date,
        required: true,
    }
})

const PostSchema : Schema<Post> = new Schema({
    readme : {
        type : String,
        required: true,
    },
    insta_utube : {
        type : String,
        required: true,
    },
    linkedin : {
        type : String,
        required: true,
    }
})

const UserSchema : Schema<UserInterface> = new Schema({
    githubid : {
        type : String,
        required: true,
        unique : true,
    },
    name : {
        type : String,
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    avatarUrl : { type: String, required: true },
    repos_url : { type: String },
    bio : { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    role: { type: String, default: 'user', required: true },
    commit : [CommitSchema],
    posts : [PostSchema]
}, {
    timestamps: true,
});

export const User = (mongoose.models.User) as mongoose.Model<UserInterface> || mongoose.model<UserInterface>('User', UserSchema);