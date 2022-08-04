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

export const findById = async (
    experienceId: number
): Promise<Experience | null> => {
    return await experienceDAO.findOne({
        where: { id: experienceId },
        relations: {
            user: true,
        },
    });
};

export const deleteById = async (experienceId: number) => {
    await experienceDAO
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: experienceId })
        .execute();
};

export const updateExperience = async (
    experience: Experience
): Promise<Experience> => {
    return await experienceDAO.save(experience);
};
