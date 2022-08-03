import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import experienceService = require('../services/ExperienceService');
import { scrubUserData } from '../services/UserService';

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
