import { Experience } from '../models/Experience';
import { User } from '../models/User';
import { ExperienceInfo } from '../types/ExperienceInfo';
import experienceRepository = require('../repository/ExperienceRepository');

export const createNewExperience = async (
    user: User,
    experienceInfo: ExperienceInfo
): Promise<Experience> => {
    return experienceRepository.createExperience(user, experienceInfo);
};

export const findById = async (
    experienceId: number
): Promise<Experience | null> => {
    return await experienceRepository.findById(experienceId);
};

export const hasAuthorization = async (
    currentUserId: string,
    experienceId: number
): Promise<Boolean> => {
    const experience = await findById(experienceId);

    if (!experience) return false;

    return experience.user.id === currentUserId;
};

export const deleteById = async (experienceId: number) => {
    await experienceRepository.deleteById(experienceId);
};

export const updateExperience = async (
    newExperience: Experience
): Promise<Experience> => {
    return await experienceRepository.updateExperience(newExperience);
};
