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

router.post('/user', UserController.register);
router.get('/user/:id', UserController.getUserById);


export default router;