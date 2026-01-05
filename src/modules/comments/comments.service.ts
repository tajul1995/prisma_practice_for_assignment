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

const getCommentByAuthor= async(authorId:string)=>{
    return await prisma.comment.findMany({
        where:{
            authorId
        },
        orderBy:{
            createdAt:'desc'
        },
        include:{
            post:{
                select:{
                    title:true,
                    id:true
                }
            }
        }
    })
}

const deleteComment=async(Id:string,authorId :string)=>{
    const commentData = await prisma.comment.findFirst({
        where:{
            id:Id,
            authorId

        }
        
    })
    if(!commentData){
        throw new Error("your input is invalied")
    }
    const result = await prisma.comment.delete({
        where:{
            id:Id
        }
    })
    return result
}
export const commentService={
    createComment,
    getCommentById,
    getCommentByAuthor,
    deleteComment
}