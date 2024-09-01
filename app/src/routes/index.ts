import express from 'express'
import UserController from '../controllers/UserController';
const router = express.Router();


/**
 * @param {Request} request - O objeto de requisição.
 * @param {Response} response - O objeto de resposta.
 */


router.get('/', function (request, response) {
    return response.status(200).json({ message: "Api Book Management" });
});


/*
 * User Routes
 */

router.post('/user', UserController.createUser);
router.get('/user/:id?', UserController.getById);
router.get('/users', UserController.getAll);
router.delete('/user/:id?', UserController.delete)
router.patch('/user/:id?', UserController.updateUserById)



export default router;