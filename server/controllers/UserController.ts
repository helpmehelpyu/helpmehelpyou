import { NextFunction, Request, Response } from 'express';
import {
    matchedData,
    ValidationError,
    validationResult,
} from 'express-validator';
import userService = require('../services/UserService');
import mediaService = require('../services/MediaService');
import linkService = require('../services/LinkService');

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const [success, token] = await userService.login(email, password);

    if (!success) {
        return res.status(403).json({
            type: 'InvalidLoginInformationError',
            message: 'Invalid email or password',
        });
    }

    res.status(200).json({ authToken: token });
};

export const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map((err: ValidationError) => {
                    type: 'ValidationError';
                    message: err.msg;
                    value: err.value;
                    location: err.location;
                }),
            });
        }

        const newUser = await userService.createUser(req.body);
        res.status(201).json({ userId: newUser.id });
    } catch (err: any) {
        res.status(400).json({
            errors: [
                {
                    type: 'DuplicateEmailError',
                    message:
                        'A User with this account already exists, please log in instead',
                },
            ],
        });
    }
};

export const authorizeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.locals.user.id !== req.params.userId) {
        return res.status(403).json({
            message:
                'The current user does not have permissions to perform this action',
        });
    }
    next();
};

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const updatedUser = await userService.updateUserInfo(res.locals.user, {
            ...matchedData(req, { locations: ['body'] }),
        });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            errors: [
                {
                    type: 'DuplicateEmailError',
                    message: 'A User with this email address already exists',
                },
            ],
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await mediaService.deleteAssociatedMedia(res.locals.user.id);
        await linkService.deleteAssociatedLinks(res.locals.user.id);

        const rowsAffected = await userService.deleteUser(res.locals.user);
        if (rowsAffected != 1) {
            return res.status(500).json({
                message: 'unabled to delete the requested resource',
            });
        }

        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unabled to delete the requested resource',
        });
    }
};
