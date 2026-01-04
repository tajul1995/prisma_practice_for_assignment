
import { Request, Response } from "express"
import { postService } from "./post.service"
import { PostStatus } from "../../generated/prisma/enums"
import paginationSortingHelpers from "../helpers/paginationBysorting"

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
        const isFeatured=req.query.isFeatured?req.query.isFeatured==='true'?
        true:
        req.query.isFeatured==='false'?
        false:undefined
        
        
        :undefined


        const status=req.query.status as PostStatus
        const authorId = req.query.authorId
        // const page=Number(req.query.page ?? 1)
        // const limit=Number(req.query.limit ?? 10)
        // const skip=(page-1)*limit
        // const sortBy=req.query.sortBy as string | undefined
        // const sortOrder=req.query.sortOrder as string |undefined
        const options=paginationSortingHelpers(req.query)
        const {page,limit,skip,sortBy,sortOrder}=options
        
        const result = await postService.getAllPost(searchString as string,tags,isFeatured as boolean,status,authorId as string|undefined ,page,limit,skip,sortBy,sortOrder)
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