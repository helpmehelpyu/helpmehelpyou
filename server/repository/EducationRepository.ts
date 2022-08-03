import { AppDataSource } from '../database/DataSource';
import { Education } from '../models/Education';
import { User } from '../models/User';

const educationDAO = AppDataSource.getRepository(Education);

export const createEducation = async (
    user: User,
    educationDetails: { [x: string]: any }
): Promise<Education> => {
    const newEducationEntry = educationDAO.create(educationDetails);
    newEducationEntry.user = user;
    return educationDAO.save(newEducationEntry);
};

export const deleteByUserId = async (userId: string) => {
    await educationDAO
        .createQueryBuilder()
        .delete()
        .where('userId = :userId', { userId: userId })
        .execute();
};
