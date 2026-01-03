
import { prisma } from "../lib/prisma"
import { userRole } from "../middleware/auth"

const seedAdmin=async()=>{
    try {
        const adminData={
            name:"Admin Shab4",
            email:"admin@admin4.com",
            role:userRole.ADMIN,
            password:"tajul1989@"
            
            
        }
        const existingUser= await prisma.user.findUnique({
            where:{
                email:adminData.email
            }
        })
        if(existingUser){
            throw new Error("user already exists")
        }
        const res = await fetch("http://localhost:5000/api/auth/sign-up/email", {
  method:"POST",
  headers:{
    "Content-Type":"application/json",
    "Origin": "http://localhost:4000"
  },
  body: JSON.stringify(adminData),
})

console.log(res)
if(res.ok){
    await prisma.user.update({
        where:{
            email:adminData.email
        },
        data:{
            emailVerified:true
        }
    })
}

    } catch (error) {
        console.log(error)
    }
}
seedAdmin()