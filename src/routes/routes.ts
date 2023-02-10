import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import RoleMiddleware from '../middlewares/RoleMiddleware';
import IsValidMiddleware from '../middlewares/IsValidMiddleware';
import ScriptController from '../controllers/ScriptController';
import Multer from '../multer/multer';


const routes =  Router();

routes.post('/auth', (req, res) => AuthController.login(req, res));

routes.post('/users', (req, res) => UserController.create(req, res));
routes.get('/users', AuthMiddleware,RoleMiddleware.roleAdmin,(req:Request,res:Response) => UserController.findAll(res));
routes.delete('/users/:id', AuthMiddleware,RoleMiddleware.roleAdmin,(req:Request,res:Response) => UserController.delete(req, res));
routes.patch('/users/updatetoadmin/:id', AuthMiddleware,RoleMiddleware.roleOwner,(req:Request,res:Response) => UserController.updateToAdmin(req, res));
routes.patch('/users/removeadmin/:id', AuthMiddleware,RoleMiddleware.roleOwner,(req:Request,res:Response) => UserController.removeAdmin(req, res));
routes.patch('/users/resetpassword/:id', AuthMiddleware,RoleMiddleware.roleAdmin,(req:Request,res:Response) => UserController.resetPassword(req, res));
routes.patch('/users/newpassword/:id', AuthMiddleware,IsValidMiddleware.roleValid,(req:Request,res:Response) => UserController.newPassword(req, res));
routes.patch('/users/valid/:id', AuthMiddleware,RoleMiddleware.roleAdmin,(req:Request,res:Response) => UserController.validUser(req, res));
routes.patch('/users/:id', AuthMiddleware,IsValidMiddleware.roleValid,(req:Request,res:Response) => UserController.update(req, res));

routes.post('/procedures', AuthMiddleware, RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.create(req, res, "Procedures"));
routes.get('/procedures', AuthMiddleware, IsValidMiddleware.roleValid, (req:Request,res:Response) => ScriptController.findAll(res, "Procedures"));
routes.delete('/procedures/:id', AuthMiddleware,RoleMiddleware.roleAdmin, (req:Request,res:Response) => ScriptController.delete(req, res, "Procedures"));
routes.put('/procedures/:id', AuthMiddleware,RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.update(req, res, "Procedures"));


routes.post('/out', AuthMiddleware,RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.create(req, res, "Out"));
routes.get('/out', AuthMiddleware, IsValidMiddleware.roleValid, (req:Request,res:Response) => ScriptController.findAll(res, "Out"));
routes.delete('/out/:id', AuthMiddleware,RoleMiddleware.roleAdmin, (req:Request,res:Response) => ScriptController.delete(req, res, "Out"));
routes.put('/out/:id', AuthMiddleware,RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.update(req, res, "Out"));


routes.post('/off', AuthMiddleware, RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.create(req, res, "Off"));
routes.get('/off', AuthMiddleware, IsValidMiddleware.roleValid,(req:Request,res:Response) => ScriptController.findAll(res, "Off"));
routes.delete('/off/:id', AuthMiddleware, RoleMiddleware.roleAdmin, (req:Request,res:Response) => ScriptController.delete(req, res, "Off"));
routes.put('/off/:id', AuthMiddleware, RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.update(req, res, "Off"));



export default routes;
