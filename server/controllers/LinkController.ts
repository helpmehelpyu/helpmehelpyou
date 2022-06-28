import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import linkService = require('../services/LinkService');
import userService = require('../services/UserService');

export const createNewLink = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const newLink = await linkService.createNewLink(res.locals.user, {
        ...matchedData(req, { locations: ['body'] }),
    });

    return res.status(201).json({
        ...newLink,
        owner: userService.castUserToAuthor(res.locals.user),
    });
};
