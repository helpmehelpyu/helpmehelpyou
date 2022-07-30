import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userService = require('../services/UserService');

export async function authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token =
            req.headers.authorization &&
            req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.sendStatus(401);
        }

        const { userId } = jwt.verify(
            token,
            process.env.TOKEN_SECRET!
        ) as JwtPayload;

        const user = await userService.findById(userId, { userProfile: true });
        if (!user) {
            return res.sendStatus(401);
        }
        res.locals.user = user;
        next();
    } catch (err) {
        return res.sendStatus(401);
    }
}
