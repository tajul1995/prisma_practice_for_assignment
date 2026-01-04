import { Request, Response } from "express";
import { commentService } from "./comments.service";


const createComment=async(req:Request,res:Response)=>{
    try {
        const user=req.user
        req.body.authorId=user?.id
        const result=await commentService.createComment(req.body)
        res.status(200).json({
            success:true,
            message:'create comment successfully',
            data:result
        })
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:'dont create any comment',
            data:error.message
        })
    }
}
export const commentController={
    createComment
}

