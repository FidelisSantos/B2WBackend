import express from 'express';
import cors from 'cors';
import * as env from 'dotenv'
import bodyParser from 'body-parser';
import AuthRoute from './routes/AuthRoute';
import UserRoute from './routes/UserRoute';
import ScriptRoute from './routes/ScriptRoute';


env.config()

class App {
  public readonly app = express();
  constructor() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use(cors())

    this.app.use("/auth", AuthRoute.router);
    this.app.use("/users", UserRoute.router);
    this.app.use(ScriptRoute.router);
  }
}

export default new App();
