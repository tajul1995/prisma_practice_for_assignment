
import express from 'express'
import { commentController } from './comments.controller'
import auth, { userRole } from '../../middleware/auth'

const router= express.Router()
router.get('/:id',commentController.getCommentById)
router.post('/',auth(userRole.ADMIN,userRole.USER),commentController.createComment)
 export const commentRouter=router