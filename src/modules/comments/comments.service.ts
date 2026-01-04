import { prisma } from "../../lib/prisma"

 type Comment={
     content:string,
     postId :string,
     authorId : string,
      parentId?:string
 }
const createComment= async(data:Comment)=>{
    const postData = await prisma.post.findUniqueOrThrow({
        where:{
            id:data.postId
        }
    })
    if(data.parentId){
        const parentData= await prisma.comment.findUniqueOrThrow({
            where:{
                id:data.parentId
            }
        })
    }
    const result= await  prisma.comment.create({
        data
    })
    return result
}

const getCommentById=async(id:string)=>{
    return await prisma.comment.findUnique({
        where:{
            id:id
        },
        include:{
            post:{
                select:{
                    id:true,
                    title:true
                }
            }
        }
    })
}

export const commentService={
    createComment,
    getCommentById
}