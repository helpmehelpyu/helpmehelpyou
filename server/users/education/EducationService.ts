import { User } from '../User.entity';
import { Education } from './Education.entity';
import { EducationDetails } from './EducationDetails';
import educationRepository = require('./EducationRepository');

export const createEducation = async (
    user: User,
    educationDetails: EducationDetails
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

export const updateEducation = async (newEducation: Education) => {
    return await educationRepository.updateEducation(newEducation);
};
