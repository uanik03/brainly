import mongoose, { Schema } from "mongoose";

import { v4 as uuidv4 } from 'uuid';

export enum ContentType {
    DOCUMENT = "document",
    TWEET = "twitter",
    YOUTUBE = "youtube",
    LINK = "link",
}
export interface Content {
    _id:String
    contentType: ContentType;
    link: string;
    title: string;
    // tags: Schema.Types.ObjectId[];
    userId:String
  }

  const contentSchema = new mongoose.Schema<Content>({
    _id: {
        type: String, // Use String for UUID
        default: () => uuidv4(), // Automatically generate UUID
    },
    contentType: {
        type: String,
        enum: Object.values(ContentType), // Enforce ContentType values
        required: true,
    },
    link: {
        type: String,
        default: null,
    },
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: String, // Referencing UUID as String
        ref: "userSchema",
        required: true,
    },
});



export default mongoose.model<Content>("contentSchema", contentSchema)