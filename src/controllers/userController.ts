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

    //@ts-ignore
    const { password: _password, ...responseUser } = user._doc;

    res.status(201).json({ user: responseUser, status: 'success' });
  } catch (e: any) {
    res.status(400).json({ status: 'error', message: e.message });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect user name or password!',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect user name or password!',
      });
    }
    //@ts-ignore
    const { password: _password, ...responseUser } = user._doc;

    res.status(200).json({ user: responseUser, status: 'success' });
  } catch (e: any) {
    res.status(400).json({ status: 'error', message: e.message });
  }
};
