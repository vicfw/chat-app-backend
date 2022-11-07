import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json({ user, status: 'success' });
  } catch (e: any) {
    res.status(400).json({ status: 'error', message: e.message });
  }

  console.log(req.body);
};
