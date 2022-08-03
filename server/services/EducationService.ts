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

export const deleteById = async (educationId: number) => {
    console.log(educationId);
    await educationRepository.deleteById(educationId);
};

export const findById = async (
    educationId: number
): Promise<Education | null> => {
    return await educationRepository.findById(educationId);
};

export const updateEducation = async (
    education: Education,
    newEducation: Education
) => {
    return await educationRepository.updateEducation(newEducation);
};
