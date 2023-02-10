import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import * as env from 'dotenv'

env.config()
export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {

  const { authorization } = req.headers;

  if(!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data:any = jwt.verify(token, process.env.JWTKEY as string);
    next(data);
  } catch {
    return res.sendStatus(401);
  }
}
