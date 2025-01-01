import mongoose from "mongoose";
import { UUIDTypes, v4 as uuidv4 } from 'uuid';

import validator from "validator";

export interface User {
  _id: String;
    name: string;
    email: string;
    profile?: string;
    password: string
  }

  const userSchema = new mongoose.Schema<User>({
    _id: {
        type: String, // Use String for UUID
        default: () => uuidv4(),
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    profile: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: "Please provide a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        select: false,
    },
});



export default mongoose.model<User>("userSchema", userSchema)