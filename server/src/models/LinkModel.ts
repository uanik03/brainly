import mongoose from "mongoose";

export interface LinkType {
    hash: String;
    userId: mongoose.Schema.Types.ObjectId
}

const LinkModelSchema= new mongoose.Schema<LinkType>({
    hash:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userSchema"
    }

})

export default mongoose.model("LinkModelSchema", LinkModelSchema)