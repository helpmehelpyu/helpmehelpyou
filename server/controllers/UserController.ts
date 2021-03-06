import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
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

    res.status(200).json({ auth_token: token });
};

export const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        await userService.createUser({
            ...matchedData(req, {
                locations: ['body'],
                includeOptionals: true,
            }),
        });

        // if we've made it to here then the login must be a success
        // the email and password should also exist on the request body
        const [, token] = await userService.login(
            req.body.email,
            req.body.password
        );

        res.status(201).json({
            auth_token: token,
        });
    } catch (err: any) {
        console.log(err);
        res.status(400).json({
            type: 'DuplicateEmailError',
            message:
                'A User with this account already exists, please log in instead',
        });
    }
};

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const updatedUser = await userService.updateUser(res.locals.user, {
            ...matchedData(req, { locations: ['body'] }),
        });

        res.status(200).json({
            ...updatedUser,
            password: undefined,
            email: undefined,
            id: undefined,
        });
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
                message: 'Unable to delete the requested resource',
            });
        }

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to delete the requested resource',
        });
    }
};

export const getUserData = async (req: Request, res: Response) => {
    const user = await userService.findById(req.params.userId);
    if (!user) {
        res.status(404).json({
            message: 'The user with this ID does not exist',
        });
    }
    res.status(200).json({
        ...user,
        password: undefined,
    });
};

export const getCurrentUserData = async (req: Request, res: Response) => {
    const user = await userService.findById(res.locals.user.id, true);
    res.status(200).json({
        ...user,
        password: undefined,
    });
};
