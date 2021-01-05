import Router from '@koa/router';

import AuthController from './controllers/auth';
import UserController from './controllers/user';

// const router = new Router();
const unprotectedRouter = new Router();

//auth相关路由 (第一个参数是定义的路径，第二个是方法)
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);

const protectedRouter = new Router();

// users相关的路由
protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.showUserDetail);
protectedRouter.put('/users/:id', UserController.updateUser);
protectedRouter.delete('/user/:id', UserController.deleteUser);

export { protectedRouter, unprotectedRouter };