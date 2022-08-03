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
