import { Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import RoleMiddleware from "../middlewares/RoleMiddleware";
import IsValidMiddleware from "../middlewares/IsValidMiddleware";


class UserRoute {
  private controller = UserController;
  constructor(public readonly router: Router) {
    this.router = router;
    this.load();
  }

  load() {
    this.router.post('/', (req, res) => this.controller.create(req, res));
    this.router.get('/', AuthMiddleware,RoleMiddleware.roleAdmin,(req:Request,res:Response) => this.controller.findAll(res));
    this.router.delete('/:id', AuthMiddleware,RoleMiddleware.roleAdmin,(req:Request,res:Response) => this.controller.delete(req, res));
    this.router.patch('/updatetoadmin/:id', AuthMiddleware,RoleMiddleware.roleOwner,(req:Request,res:Response) => this.controller.updateToAdmin(req, res));
    this.router.patch('/removeadmin/:id', AuthMiddleware,RoleMiddleware.roleOwner,(req:Request,res:Response) => this.controller.removeAdmin(req, res));
    this.router.patch('/resetpassword/:id', AuthMiddleware,RoleMiddleware.roleAdmin,(req:Request,res:Response) => this.controller.resetPassword(req, res));
    this.router.patch('newpassword/:id', AuthMiddleware,IsValidMiddleware.roleValid,(req:Request,res:Response) => this.controller.newPassword(req, res));
    this.router.patch('/valid/:id', AuthMiddleware,RoleMiddleware.roleAdmin,(req:Request,res:Response) => this.controller.validUser(req, res));
    this.router.patch('/:id', AuthMiddleware,IsValidMiddleware.roleValid,(req:Request,res:Response) => this.controller.update(req, res));
  }
}

export default new UserRoute(Router());
