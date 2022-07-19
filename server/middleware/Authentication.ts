import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userService = require('../services/UserService');

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.sendStatus(401);
    }

    const { id } = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    const user = await userService.findById(id);
    if (!user) {
      return res.sendStatus(401);
    }
    res.locals.user = user;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}
