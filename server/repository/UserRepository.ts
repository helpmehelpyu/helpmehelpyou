import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../database/DataSource';
import { User } from '../models/User';

const userDAO = AppDataSource.getRepository(User);

export const findById = async (userId: string): Promise<User | null> => {
    return userDAO.findOneBy({ id: userId });
};

export const findByEmail = async (email: string): Promise<User | null> => {
    return AppDataSource.getRepository(User).findOneBy({
        email: email,
    });
};
export const createNewUser = async (userInfo: {
    [x: string]: any;
}): Promise<User> => {
    const newUser = userDAO.create(userInfo);
    return userDAO.save(newUser);
};

export const updateUser = async (updatedUser: User): Promise<User> => {
    return userDAO.save(updatedUser);
};

export const deleteUser = async (user: User): Promise<DeleteResult> => {
    return userDAO.delete({ id: user.id });
};
