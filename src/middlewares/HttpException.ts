import { Response } from "express"
import { ApiError } from "../error/ApiError";

class HttpException {
  filter(error: Error & Partial<ApiError>, res: Response) {
    return res.status(error.statusCode ? error.statusCode : 500).
              send({
                      message: error.statusCode ? error.message : "Internal Server Error",
                      timestamp: new Date()
                    });
  }
}

export default new HttpException();
