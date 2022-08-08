import { User } from '../User.entity';
import { Experience } from './Experience.entity';
import { ExperienceInfo } from './ExperienceInfo';
import experienceRepository = require('./ExperienceRepository');

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
