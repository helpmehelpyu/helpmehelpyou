import { AppDataSource } from '../database/DataSource';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Author } from '../types/Author';

export const findUserById = async function (
    userId: string
): Promise<User | null> {
    return AppDataSource.getRepository(User).findOneBy({ id: userId });
};

export const createUser = async function (userInfo: {
    [x: string]: any;
}): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(userInfo.password, salt);

    userInfo.phoneNumber = userInfo.phoneNumber;
    const userRepository = AppDataSource.getRepository(User);

    const newUser = userRepository.create(userInfo);
    return userRepository.save(newUser);
};

export const login = async function (
    email: string,
    password: string
): Promise<[boolean, string?]> {
    const user = await AppDataSource.getRepository(User).findOneBy({
        email: email,
    });
    if (!user) {
        return [false];
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
        return [false];
    }

    const token = await jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!, {
        expiresIn: '24h',
    });

    return [true, token];
};

export const castUserToAuthor = function (user: User): Author {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
    };
};

export const updateUserInfo = async function (
    user: User,
    newProperties: { [x: string]: any }
): Promise<User> {
    user = {
        ...user,
        ...newProperties,
    };
    return await AppDataSource.getRepository(User).save(user);
};

export const deleteUser = async function (
    user: User
): Promise<number | null | undefined> {
    const res = await AppDataSource.getRepository(User).delete({ id: user.id });
    return res.affected;
};
