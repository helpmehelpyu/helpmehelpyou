import { AppDataSource } from '../../database/DataSource';
import { User } from '../User.entity';
import { Education } from './Education.entity';
import { EducationDetails } from './EducationDetails';

const educationDAO = AppDataSource.getRepository(Education);

export const findById = async (
    educationId: number
): Promise<Education | null> => {
    return await educationDAO.findOne({
        where: {
            id: educationId,
        },
        relations: {
            user: true,
        },
    });
};

export const createEducation = async (
    user: User,
    educationDetails: EducationDetails
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

export const deleteById = async (educationId: number) => {
    await educationDAO
        .createQueryBuilder()
        .delete()
        .where('id = :educationId', { educationId: educationId })
        .execute();
};

export const updateEducation = async (
    updatedEducation: Education
): Promise<Education> => {
    return await educationDAO.save(updatedEducation);
};
