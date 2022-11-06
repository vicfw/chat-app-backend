import { NextFunction, Request, Response } from 'express';

export const registerController = (
  req: Request,
  res: Response
  //   next: NextFunction
) => {
  console.log(req.body);
};
