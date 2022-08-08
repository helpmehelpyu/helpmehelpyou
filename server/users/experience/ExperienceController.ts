import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { scrubUserData } from '../UserService';
import experienceService = require('./ExperienceService');

export const addNewExperience = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const newExperience = await experienceService.createNewExperience(
        res.locals.user,
        req.body
    );
    res.status(200).json({
        ...newExperience,
        user: scrubUserData(newExperience.user),
    });
};

export const deleteExistingExperience = async (req: Request, res: Response) => {
    const experience = await experienceService.findById(req.body.experienceId);
    if (!experience) {
        return res.status(404).json({
            message: 'Experience with this specified id does not exist',
        });
    }
    if (
        !(await experienceService.hasAuthorization(
            res.locals.user.id,
            req.body.experienceId
        ))
    ) {
        return res.status(403).json({
            message: 'current user is not authorized to perform this action',
        });
    }

    await experienceService.deleteById(req.body.experienceId);

    res.sendStatus(200);
};

export const editExistingExperience = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const experience = await experienceService.findById(req.body.id);

    if (!experience) {
        return res.status(404).json({
            message: 'experience with this id could not be found',
        });
    }

    if (experience.user.id !== res.locals.user.id) {
        return res.status(403).json({
            message: 'User is not authorized to perform this action',
        });
    }

    const newExperience = await experienceService.updateExperience(req.body);
    res.status(200).json({
        ...newExperience,
        user: scrubUserData(newExperience.user),
    });
};
