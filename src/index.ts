import express, { NextFunction,  Response, Request } from 'express';
import routes from './routes/routes';
import HttpException from './middlewares/HttpException';
import { ApiError } from './error/ApiError';
import cors from 'cors';
import * as env from 'dotenv'
import bodyParser from 'body-parser';


env.config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.use(routes);

app.listen(5000);

app.use((error:Error & Partial<ApiError>, req:Request, res:Response, next:NextFunction)=>
           HttpException.filter(error, req, res, next)
);
