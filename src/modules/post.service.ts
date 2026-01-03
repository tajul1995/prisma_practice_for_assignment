import {  PostWhereInput } from './../../generated/prisma/internal/prismaNamespace';
import { Post } from "../../generated/prisma/client";

import { prisma } from "../lib/prisma";

const createPost =async(data:Omit<Post,"id"|"createdAt"|"updatedAt"|"authorId">,userId:string)=>{
    const result =await prisma.post.create(
      {
        data:{
          ...data,authorId:userId
        }
      }
    )
    return result
}

const getAllPost=async(search:string,tags:string[]|[])=>{
  const andCondition:PostWhereInput[]=[]
  if(search){
    andCondition.push({OR:[{
        title:{
        contains:search,
        mode:'insensitive'
      }
      },
    {
      content:{
        contains:search,
        mode:'insensitive'
      }
    },{
      tags:{
        has:search
       
      }
    }
    
    ],})
  }
  if(tags){
    andCondition.push({
      tags:{
      hasEvery:tags
    }
    })
  }
  const result =await prisma.post.findMany({
    where:{
      AND:andCondition
      
    
      
      
    }
  })
  return result
}


export const  postService={
    createPost,
    getAllPost
}