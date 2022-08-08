import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../database/DataSource';
import { User } from './User.entity';
import { LoadUserRelations } from './LoadUserRelations';
import { UserData } from '../users/UserData';
import { createDefaultUserProfile } from './profile/UserProfileRepository';

const userDAO = AppDataSource.getRepository(User);

export const findById = async (
    userId: string,
    loadRelations: LoadUserRelations
): Promise<User | null> => {
    return userDAO.findOne({
        where: { id: userId },
        relations: {
            workSamples: loadRelations.workSamples || false,
            education: loadRelations.education || false,
            experience: loadRelations.experience || false,
            userProfile: loadRelations.userProfile || false,
            links: loadRelations.links || false,
        },
    });
};

export const findByEmail = async (email: string): Promise<User | null> => {
    return AppDataSource.getRepository(User).findOneBy({
        email: email,
    });
};
export const createNewUser = async (userInfo: UserData): Promise<User> => {
    const newUser = userDAO.create(userInfo);
    const newUserProfile = await createDefaultUserProfile();
    newUser.userProfile = newUserProfile;
    return userDAO.save(newUser);
};

export const updateUser = async (updatedUser: User): Promise<User> => {
    return userDAO.save(updatedUser);
};

export const deleteUser = async (user: User): Promise<DeleteResult> => {
    return userDAO.delete({ id: user.id });
};
