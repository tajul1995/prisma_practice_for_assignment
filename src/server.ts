import app from "./app"
import { prisma } from "./lib/prisma"
const port =process.env.PORT || 3000

 async function server(){
    try {
        await prisma.$connect()
        console.log('database connected successfully')
        app.listen(port,()=>{
            console.log(`database is running on port ${port}`)
        })
        
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        process.exit(1)
        
    }
 }
 server()