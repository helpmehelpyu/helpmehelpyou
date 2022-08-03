import { AppDataSource } from '../database/DataSource';
import { Experience } from '../models/Experience';
import { User } from '../models/User';
import { ExperienceInfo } from '../types/ExperienceInfo';

const experienceDAO = AppDataSource.getRepository(Experience);

export const createExperience = async (
    user: User,
    experienceInfo: ExperienceInfo
): Promise<Experience> => {
    const newExperience = await experienceDAO.create(experienceInfo);
    newExperience.user = user;
    return experienceDAO.save(newExperience);
};
