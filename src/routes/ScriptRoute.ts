import { Request, Response, Router } from "express";
import ScriptController from "../controllers/ScriptController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import RoleMiddleware from "../middlewares/RoleMiddleware";
import Multer from "../multer/multer";
import IsValidMiddleware from "../middlewares/IsValidMiddleware";

class ScriptRoute {
  private controller = ScriptController;
  constructor(public readonly router: Router) {
    this.router = router;
    this.load();
  }

  load() {
    this.router.post('/procedures', AuthMiddleware, RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.create(req, res, "Procedures"));
    this.router.get('/procedures', AuthMiddleware, IsValidMiddleware.roleValid, (req:Request,res:Response) => ScriptController.findAll(res, "Procedures"));
    this.router.delete('/procedures/:id', AuthMiddleware,RoleMiddleware.roleAdmin, (req:Request,res:Response) => ScriptController.delete(req, res, "Procedures"));
    this.router.put('/procedures/:id', AuthMiddleware,RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.update(req, res, "Procedures"));


    this.router.post('/out', AuthMiddleware,RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.create(req, res, "Out"));
    this.router.get('/out', AuthMiddleware, IsValidMiddleware.roleValid, (req:Request,res:Response) => ScriptController.findAll(res, "Out"));
    this.router.delete('/out/:id', AuthMiddleware,RoleMiddleware.roleAdmin, (req:Request,res:Response) => ScriptController.delete(req, res, "Out"));
    this.router.put('/out/:id', AuthMiddleware,RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.update(req, res, "Out"));


    this.router.post('/off', AuthMiddleware, RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.create(req, res, "Off"));
    this.router.get('/off', AuthMiddleware, IsValidMiddleware.roleValid,(req:Request,res:Response) => ScriptController.findAll(res, "Off"));
    this.router.delete('/off/:id', AuthMiddleware, RoleMiddleware.roleAdmin, (req:Request,res:Response) => ScriptController.delete(req, res, "Off"));
    this.router.put('/off/:id', AuthMiddleware, RoleMiddleware.roleAdmin, Multer.single("image"), (req:Request,res:Response) => ScriptController.update(req, res, "Off"));

  }
}

export default new ScriptRoute(Router());
