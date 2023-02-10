import { Response } from 'express';

export default function BadRequest(res: Response, message: string) {
  res.status(400).send(message);
}
