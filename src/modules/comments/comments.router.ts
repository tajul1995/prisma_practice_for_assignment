
import express from 'express'
import { commentController } from './comments.controller'
import auth, { userRole } from '../../middleware/auth'

const router= express.Router()
router.get('/:id',commentController.getCommentById)
router.get('/author/:authorId',commentController.getCommentByAuthor)
router.post('/',auth(userRole.ADMIN,userRole.USER),commentController.createComment)
router.delete('/:deleteId',auth(userRole.ADMIN,userRole.USER),commentController.deleteComment)
 export const commentRouter=router