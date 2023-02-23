import { Router } from "express";
import AuthController from "../controllers/AuthController";

class AuthRoute {
  private controller = AuthController;
  constructor(public readonly router: Router) {
    this.router = router;
    this.load();
  }

  load() {
    this.router.post('/',  (req, res) => this.controller.login(req, res));
  }
}

export default new AuthRoute(Router());
