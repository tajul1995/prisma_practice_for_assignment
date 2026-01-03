import { Request, Response } from "express"
import { postService } from "./post.service"

const createPost=async(req:Request,res:Response)=>{
   
    try {
        const userId = req.user?.id
        if(!userId ){
            return res.status(404).json({
            success:false,
            message:'unauthorized access',
            
        })
        }
        const data=req.body
        const result = await postService.createPost(data,userId)
        res.status(200).json({
            success:true,
            message:'created post successfully',
            data:result
        })
        
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:' popst  created unsuccessfull',
            data:error.message
        })
    }

}

const getAllPost =async(req:Request,res:Response)=>{
try {
        const {search}=req.query

        const searchString= typeof search == 'string'?search:undefined
        const tags = req.query.tags?(req.query.tags as string).split(","):[]
        const result = await postService.getAllPost(searchString as string,tags )
        res.status(200).json({
            success:true,
            message:'get  all post successfully',
            data:result
        })
        
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:' get all post unsuccessfullY',
            data:error.message
        })
    }
}

export const postController={
    createPost,
    getAllPost
}