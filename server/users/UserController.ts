import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import userService = require('./UserService');
import mediaService = require('../media/MediaService');
import linkService = require('./link/LinkService');
import userProfileService = require('./profile/UserProfileService');
import educationService = require('./education/EducationService');
import experienceService = require('./experience/ExperienceService');
import skillsService = require('./skills/SkillsService');
import { User } from './User.entity';

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
        skills: true,
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
        skills: true,
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

export const getUsers = async (req: Request, res: Response) => {
    const filterBy = req.query.filterBy;
    if (!req.query.limit || !req.query.page) {
        return res.status(400).json({
            message: 'limit and page are required query parameters',
        });
    }

    const limit = Number.parseInt(req.query.limit.toString());
    const page = Number.parseInt(req.query.page.toString()) - 1;

    if (limit < 0 || page < 0) {
        return res.status(400).json({
            message: 'limit and page must be positive numbers',
        });
    }

    let users: User[] = [];
    if (filterBy === 'skills') {
        if (!req.query.name) {
            return res.status(400).json({
                message: 'the skill name is required',
            });
        }
        const skillName = req.query.name.toString();
        users = await skillsService.getUsersWithSkill(skillName, limit, page);
    } else {
        users = await userService.getUsers(limit, page);
    }

    res.status(200).json({
        users: users,
    });
};
