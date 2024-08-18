import { Schema, model} from "mongoose";

const UsersSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthdate: {
        type: Date,
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
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        default: []
    }
});

export const UserModel = model('users', UsersSchema);