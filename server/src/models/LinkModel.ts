import mongoose from "mongoose";

// export interface LinkType {
//     hash: String;
//     userId: mongoose.Types.ObjectId
// }

const LinkModelSchema= new mongoose.Schema({
    hash:{
        type:String
    },
    userId:{
        type:String,
        ref:"userSchema"
    }

})

export default mongoose.model("LinkModelSchema", LinkModelSchema)