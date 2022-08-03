import { Education } from '../models/Education';
import { User } from '../models/User';
import educationRepository = require('../repository/EducationRepository');

export const createEducation = async (
    user: User,
    educationDetails: { [x: string]: any }
): Promise<Education> => {
    return educationRepository.createEducation(user, educationDetails);
};

export const deleteAssociatedEduction = async (userId: string) => {
    await educationRepository.deleteByUserId(userId);
};
