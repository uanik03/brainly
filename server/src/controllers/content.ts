import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid'; // Import the v4 function


import { JWTUser } from "../utils"
import userSchema from "../models/user";
import contentSchema from "../models/content";
import LinkModel from "../models/LinkModel";


export const addContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.User as JWTUser;
        const { contentType, link, title } = req.body

        if(!contentType || !link || !title){
            res.status(400).json({
                msg:"Please provide all values"
            })
            return
        }

        const user = await userSchema.findById({ _id: id })
        if (!user) {
            res.status(404).json({
                msg: "User not found"
            })
            return;
        }

        const content = await contentSchema.create({ contentType, link, title,  userId: id })
        res.status(200).json({
            msg: "content added successfully",
            content
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "something went wrong"
        })
    }
}

export const getAllContent = async (req: Request, res: Response) => {
    try {

        const { id } = req.User as JWTUser;

        const user = await userSchema.findById({ _id: id })
        if (!user) {
            res.status(404).json({
                msg: "User not found"
            })
            return;
        }

        const content = await contentSchema.find({ userId: id })
        res.status(200).json({
            msg: "contents retrived successfully",
            content
        })
        return

    } catch (error) {
        res.status(500).json({
            msg: "something went wrong"
        })
    }
}

export const deleteContent = async (req: Request, res: Response) => {
    try {
        const { id } = req.User as JWTUser;


        const { contentId } = req.params

        const user = await userSchema.findById({ _id: id })

        if (!user) {
            res.status(404).json({
                msg: "User not found"
            })
            return;
        }

        const content = await contentSchema.findById({ id: contentId })
        if (!content) {
            res.status(400).json({
                msg: "invalid content"
            })
            return
        }
        if (content.userId !== id) {
            res.status(400).json({
                msg: "Unauthorized access"
            })
            return

        }

        await contentSchema.findByIdAndDelete({ id: contentId })
        res.status(200).json({
            msg: "Content deleted successfully",
            contentId
        })
        return
    } catch (error) {
        res.status(500).json({
            msg: "something went wrong"
        })
    }
}

export const updateContent = async (req: Request, res: Response) => {
    try {

        const { id } = req.User as JWTUser;

        const { contentId } = req.params
        const { contentType, link, title, tags } = req.body


        const user = await userSchema.findById({ _id: id })

        if (!user) {
            res.status(404).json({
                msg: "User not found"
            })
            return;
        }

        const content = await contentSchema.findById({ id: contentId })
        if (!content) {
            res.status(400).json({
                msg: "invalid content"
            })
            return
        }
        if (content.userId !== id) {
            res.status(400).json({
                msg: "Unauthorized access"
            })
            return

        }

        const updatedContent = await contentSchema.findByIdAndUpdate({ contentType, link, title, tags })

        res.status(200).json({
            msg: "content updated successfully",
            updatedContent
        })
        return

    } catch (error) {
        res.status(500).json({
            msg: "something went wrong"
        })
    }
}

export const createShareableLink = async (req: Request, res: Response) => {
   try {
     const { id } = req.User as JWTUser;
     const user = await userSchema.findById({ _id: id })
 
     if (!user) {
         res.status(404).json({
             msg: "User not found"
         })
         return;
     }
 
     const existingLink = await LinkModel.findOne({
         userId: id
     })
 
     if (existingLink) {
         res.status(400).json({
             msg:"success",
             hash:existingLink.hash
         })
         return
         
     }
 
     const hash = uuidv4(); 
     const shareableLink = await LinkModel.create({
         userId:id,
         hash: hash
     })

     res.status(200).json({
        hash: shareableLink.hash
     })
 
 
 
   } catch (error) {
    res.status(500).json({
        msg:"Something went wrong"
    })
   }
}



export const deleteShareableLink = async (req:Request, res: Response) => {
    try {
        const { id } = req.User as JWTUser;
        const user = await userSchema.findById({ _id: id })
    
        if (!user) {
            res.status(404).json({
                msg: "User not found"
            })
            return;
        }
    
        const existingLink = await LinkModel.findOne({
            userId: id
        })
    
        if (!existingLink) {
            res.status(400).json({
                msg:"invalid ops",
              
            })
            return
            
        }

        await LinkModel.deleteOne({
            userId:id
        })
        res.status(200).json({
            msg:"Shareable link deleted successfully"
        })

        
    } catch (error) {

        res.status(500).json({
            msg:"Something went wrong"
        })
        
    }
    
}

export const getUserBrain = async(req:Request, res:Response)=>{
    try {
        const {linkHash} = req.params
        if(!linkHash){
            res.status(400).json({
                msg:"Please provide a Valid link"
            })
            return
        }

        const existingLink = await LinkModel.findOne({
            hash:linkHash
        }).populate("userId")

        if(!existingLink){
            res.status(404).json({
                msg:"not found"
            })
            return
        }

        console.log(existingLink)
        
        const content = await contentSchema.find({ userId: existingLink.userId })
        res.status(200).json({
            msg: "contents retrived successfully",
            content
        })
        return

    } catch (error) {
        
    }

}



