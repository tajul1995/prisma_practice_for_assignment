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
const getCommentById=async(req:Request,res:Response)=>{
    try {
        const{id}=req.params
        const result=await commentService.getCommentById(id as string)
        res.status(200).json({
            success:true,
            message:'get comment successfully',
            data:result
        })
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:'dont get any comment',
            data:error.message
        })
    }
}
const getCommentByAuthor=async(req:Request,res:Response)=>{
    try {
        const{authorId}=req.params
        const result=await commentService.getCommentByAuthor(authorId as string)
        res.status(200).json({
            success:true,
            message:'get comment successfully',
            data:result
        })
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:'dont get any comment',
            data:error.message
        })
    }
}
const deleteComment=async(req:Request,res:Response)=>{
    try {
        const user=req.user
        const{deleteId}=req.params
        
        const result=await commentService.deleteComment(deleteId as string,user?.id as string)
        res.status(200).json({
            success:true,
            message:' comment deleted  successfully',
            data:result
        })
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:' comment does not delete',
            data:error.message
        })
    }
}


export const commentController={
    createComment,
    getCommentById,
    getCommentByAuthor,
    deleteComment
}

