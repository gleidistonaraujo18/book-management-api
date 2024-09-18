import express from 'express'
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import authentication from '../middlewares/AuthMiddleware';
import BookController from '../controllers/BookController';
const router = express.Router();


router.get('/', function (request, response) {
    return response.status(200).json({ message: "Api Book Management" });
});


/*
 * User Routes
 */

router.post('/auth', AuthController.authenticate);

router.post('/user', authentication, UserController.createUser);
router.get('/user/:id?', authentication, UserController.getById);
router.get('/users', authentication, UserController.getAll);
router.delete('/user/:id?', authentication, UserController.delete)
router.patch('/user/:id?', authentication, UserController.updateUserById)

/*
 * Books Routes
 */

router.post('/book', authentication, BookController.createBook);


export default router;