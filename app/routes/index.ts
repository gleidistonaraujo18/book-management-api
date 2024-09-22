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
router.patch('/user/:id?', authentication, UserController.updateUser)

/*
 * Books Routes
 */

router.get('/books', authentication, BookController.getAll);
router.get('/book/:id?', authentication, BookController.getById);
router.post('/book', authentication, BookController.createBook);
router.patch('/book/:id?', authentication, BookController.updateBook);
router.delete('/book/:id?', authentication, BookController.deleteBook);


export default router;