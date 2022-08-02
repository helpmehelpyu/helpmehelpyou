import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import educationService = require('../services/EducationService');

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
    res.status(200).json({ newEducation });
};
