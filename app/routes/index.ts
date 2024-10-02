import express from 'express'
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import authentication from '../middlewares/AuthMiddleware';
import StockController from '../controllers/StockController';
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
 * Stock Routes
 */

router.get('/stocks', authentication, StockController.getAll);
router.get('/stock/:id?', authentication, StockController.getById);
router.post('/stock', authentication, StockController.createStock);
router.patch('/stock/:id?', authentication, StockController.updateStock);
router.delete('/stock/:id?', authentication, StockController.deleteStock);



export default router;