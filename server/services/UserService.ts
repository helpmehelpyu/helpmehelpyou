import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Author } from '../types/Author';
import userRepository = require('../repository/UserRepository');
import { LoadUserRelations } from '../types/LoadUserRelations';
import { ScrubbedUserData } from '../types/ScrubbedUserData';
import { UserData } from '../types/UserData';

export const findById = async function (
    userId: string,
    loadRelations: LoadUserRelations = {}
): Promise<User | null> {
    return userRepository.findById(userId, loadRelations);
};

export const createUser = async function (userInfo: UserData): Promise<User> {
    return userRepository.createNewUser({
        ...userInfo,
        password: await bcrypt.hash(userInfo.password, 10),
        phoneNumber: userInfo.phoneNumber || '',
    });
};

export const login = async function (
    email: string,
    password: string
): Promise<[boolean, string]> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        return [false, ''];
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
        return [false, ''];
    }

    const token = await jwt.sign(
        { userId: user.id },
        process.env.TOKEN_SECRET!,
        {
            expiresIn: '24h',
        }
    );

    return [true, token];
};

export const castUserToAuthor = function (user: User): Author {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
    };
};

export const updateUser = async function (
    user: User,
    newProperties: { [x: string]: any }
): Promise<User> {
    user = {
        ...user,
        ...newProperties,
    };
    return await userRepository.updateUser(user);
};

export const deleteUser = async function (
    user: User
): Promise<number | null | undefined> {
    const res = await userRepository.deleteUser(user);
    return res.affected;
};

export const setAvatar = async function (
    user: User,
    avatarUrl: string,
    avatarId: string
): Promise<User> {
    user.avatar.id = avatarId;
    user.avatar.source = avatarUrl;

    return await userRepository.updateUser(user);
};

export const scrubUserData = function (user: User): ScrubbedUserData {
    const scrubbedUser = { ...user, password: undefined };
    return scrubbedUser;
};
