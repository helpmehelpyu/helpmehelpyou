import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import skillService = require('./SkillsService');
import userService = require('../UserService');

export const addSkill = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    if (await hasSkill(res.locals.user.id, req.body.name)) {
        return res.status(400).json({
            message: `The current user already has the skill [${req.body.name}]`,
        });
    }

    const existingSkill = await skillService.findByName(req.body.name);
    let updatedSkill = {};
    if (existingSkill) {
        updatedSkill = await skillService.addUserToExistingSkill(
            res.locals.user,
            existingSkill
        );
    } else {
        const newSkill = skillService.createNewSkill(req.body.name);
        updatedSkill = await skillService.addUserToExistingSkill(
            res.locals.user,
            newSkill
        );
    }
    res.status(200).json(updatedSkill);
};

export const removeSkill = async (req: Request, res: Response) => {
    try {
        const skill = await skillService.findByName(req.body.name);
        if (!skill) {
            return res.status(404).json({
                message: `Skill with the name [${req.body.name}] does not exist`,
            });
        }

        const userHasSkill = await hasSkill(res.locals.user.id, req.body.name);
        if (!userHasSkill) {
            return res.status(400).json({
                message: `User does not have the specified skill [${req.body.name}]`,
            });
        }

        const rowsDeleted = await skillService.deleteSkillFromUser(
            res.locals.user.id,
            skill.id
        );

        // rowsDeleted is either 1 or 0
        if (rowsDeleted) {
            return res.sendStatus(200);
        } else {
            return res.status(500).json({
                message: 'Unable to delete the requested skill from user',
            });
        }
    } catch (e) {
        res.status(500).json({
            message:
                'Unable to delete the requested skill from user, there was a database error',
        });
    }
};

const hasSkill = async (userId: string, skillName: string) => {
    // load user's skills
    const user = await userService.findById(userId, {
        skills: true,
    });

    if (!user) {
        return false;
    }

    // check if the user already has the current skill
    return skillService.hasSkill(user.skills, skillName);
};
