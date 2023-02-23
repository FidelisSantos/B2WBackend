import App from "./app";
import * as env from 'dotenv';
import express from 'express';

env.config()

class Server {
  private port = process.env.PORT || 4000;
  constructor(private readonly app: express.Application){
    this.app = app;
    this.app.listen(5000, () => console.log(`listening on port ${this.port}`));
  }
}

new Server(App.app);
