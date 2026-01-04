import {  PostWhereInput } from './../../generated/prisma/internal/prismaNamespace';
import { Post, PostStatus } from "../../generated/prisma/client";

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

const getAllPost=async(search:string,tags:string[]|[],isFeatured:boolean,status:PostStatus,authorId:string|undefined,page:number,limit:number,skip:number,sortBy:string,
  sortOrder:string
)=>{
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
  if(tags.length>0){
    andCondition.push({
      tags:{
      hasEvery:tags
    }
    })
  }
  if(typeof isFeatured==='boolean'){
    andCondition.push({isFeatured})
  }
  if(status){
    andCondition.push({status})
  }
  if(authorId){
    andCondition.push({authorId})
  }
  const result =await prisma.post.findMany({
    take:limit,
    skip,
     where:{
        AND:andCondition
    },
    
      
    
      
      
   
    orderBy:{
      [sortBy]:sortOrder
    }
  })
  const count= await prisma.post.count({
      where:{
        AND:andCondition
    }
  })
  return {
    data:result,
    pagination:{
      total:count,
      page,
      limit,
      totalPages:Math.ceil(count/limit)
    }
  }
}

const getPostById = async (postId: string) => {
  return await prisma.$transaction(async (tx) => {
    
    await tx.post.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1
        }
      }
    });

    
    const postData = await tx.post.findUnique({
      where: { id: postId }
    });

    return postData;
  });

  
};



  
export const  postService={
    createPost,
    getAllPost,
    getPostById
}