import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import educationService = require('../services/EducationService');
import { scrubUserData } from '../services/UserService';

export const addEducation = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const newEducation = await educationService.createEducation(
        res.locals.user,
        {
            ...matchedData(req, { locations: ['body'] }),
        }
    );
    res.status(200).json({
        ...newEducation,
        user: scrubUserData(newEducation.user),
    });
};

export const deleteById = async (req: Request, res: Response) => {
    try {
        const educationId = parseInt(req.params.educationId);
        const educationEntry = await educationService.findById(educationId);

        if (!educationEntry) {
            return res.status(404).json({
                message: 'Education with this id could not be found',
            });
        }

        if (res.locals.user.id !== educationEntry.user.id) {
            return res.status(403).json({
                message: 'User is not authorized to perform this action',
            });
        }
        await educationService.deleteById(educationId);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({
            message: 'unable to delete the requested resource',
        });
    }
};
