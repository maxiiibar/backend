import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    isGitHub: {
        type: Boolean,
        default: false,
    }
});

export const UserModel = mongoose.model('users', UsersSchema);