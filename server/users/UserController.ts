import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import userService = require('./UserService');
import mediaService = require('../media/MediaService');
import linkService = require('./link/LinkService');
import userProfileService = require('./profile/UserProfileService');
import educationService = require('./education/EducationService');
import experienceService = require('./experience/ExperienceService');

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

        await userService.createUser(req.body);

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
            ...userService.scrubUserData(updatedUser),
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
        const userId = res.locals.user.id;
        await educationService.deleteAssociatedEduction(userId);
        await experienceService.deleteAssociatedExperience(userId);
        await mediaService.deleteAssociatedMedia(userId);
        await linkService.deleteAssociatedLinks(userId);

        const rowsAffected = await userService.deleteUser(res.locals.user);
        if (rowsAffected !== 1) {
            return res.status(500).json({
                message: 'Unable to delete the requested resource',
            });
        }

        await userProfileService.deleteById(res.locals.user.userProfile.id);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to delete the requested resource',
        });
    }
};

export const getUserData = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const user = await userService.findById(req.params.userId, {
        workSamples: true,
        education: true,
        experience: true,
        userProfile: true,
        links: true,
    });
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
    const user = await userService.findById(res.locals.user.id, {
        workSamples: true,
        education: true,
        experience: true,
        userProfile: true,
        links: true,
    });
    res.status(200).json(userService.scrubUserData(user!));
};

export const updateAvatar = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'Invalid file format or no data uploaded',
            });
        }

        // delete the current avatar before we update and upload a new one
        const isDeleted = await mediaService.deleteImageFromCloudById(
            res.locals.user.avatar.id
        );
        if (!isDeleted) {
            return res.status(500).json({
                message: 'Failed to delete old avatar',
            });
        }

        const avatarInfo = await mediaService.uploadImageToCloud(req.file);
        const updatedUser = await userService.setAvatar(
            res.locals.user,
            avatarInfo.url,
            avatarInfo.public_id
        );
        return res.status(200).json(userService.scrubUserData(updatedUser));
    } catch (err) {
        return res.status(500).json({
            message: 'Image could not be parsed or uploaded',
        });
    }
};

export const resetAvatar = async (req: Request, res: Response) => {
    const isDeleted = await mediaService.deleteImageFromCloudById(
        res.locals.user.avatar.id
    );
    if (!isDeleted) {
        return res.status(500).json({
            message: 'Failed to delete old avatar',
        });
    }
    const updatedUser = await userService.setAvatar(res.locals.user, '', '');
    return res.status(200).json(userService.scrubUserData(updatedUser));
};
