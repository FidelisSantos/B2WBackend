import { NextFunction, Request, Response } from "express"
import { ApiError } from "../error/ApiError";

class HttpException {

  filter(error:Error & Partial<ApiError>, req:Request, res:Response, next:NextFunction) {
    const statusCode = error.statusCode ?? 500;
    return res.send({ message: error.message, timestamp: new Date() }).status(statusCode)
  }
}

export default new HttpException();
