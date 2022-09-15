import {
    castUserToAuthor,
    createUser,
    deleteUser,
    findById,
    login,
    updateUser,
} from './UserService';
import bcrypt from 'bcryptjs';
import { User } from './User.entity';

const mockUser = {
    id: '1',
    firstName: 'test',
    lastName: 'user',
    email: 'testuser@email.com',
    password: 'password',
    phoneNumber: '123-456-7890',
    rating: 50,
    workSamples: [],
    links: [],
    skills: [],
    education: [],
    experience: [],
    avatar: { source: '', id: '' },
    userProfile: {
        id: 1,
        featuredWork: '',
        description: '',
        headline: '',
    },
};

jest.mock('./UserRepository', () => {
    const findByIdMock = jest.fn((userId: string) => {
        if (mockUser.id === userId) {
            return mockUser;
        }
        return null;
    });

    const createNewUserMock = jest.fn((userInfo) => {
        if (userInfo.email === mockUser.email) {
            throw Error();
        }

        userInfo.id = '2';
        userInfo.rating = 50;
        userInfo.skills = [];

        return {
            ...userInfo,
        };
    });

    const findByEmailMock = jest.fn(async (email: string) => {
        if (email === mockUser.email) {
            return {
                ...mockUser,
                password: await bcrypt.hash('password', 10),
            };
        }

        return null;
    });

    const updateUserMock = jest.fn((user: User) => {
        if (user.email === mockUser.email) {
            throw Error();
        }
        return user;
    });

    const deleteUserMock = jest.fn((user: User) => {
        const res = { affected: 0 };
        if (user.id === mockUser.id) {
            res.affected = 1;
        }
        return res;
    });

    return {
        findById: findByIdMock,
        createNewUser: createNewUserMock,
        findByEmail: findByEmailMock,
        updateUser: updateUserMock,
        deleteUser: deleteUserMock,
    };
});

describe('finding a user by id', () => {
    test('where the user corresponding to the id exists', async () => {
        const actualUser = await findById('1');
        expect(actualUser).not.toBeNull();
        expect(actualUser).toEqual(mockUser);
    });

    test('where the user corresponding to the id does not exist', async () => {
        const user = await findById('2');
        expect(user).toBeNull();
    });
});

describe('creating a new user', () => {
    test('with valid user info', async () => {
        const userInfo = {
            firstName: 'test',
            lastName: 'user',
            email: 'createusertest@email.com',
            password: 'password',
        };

        const user = await createUser(userInfo);

        expect(user).not.toBeNull();
        expect(user.firstName).toEqual('test');
        expect(user.lastName).toEqual('user');
        expect(user.email).toEqual('createusertest@email.com');
        expect(user.id).toBeDefined();

        expect(user.password).not.toEqual('password');
        expect(await bcrypt.compare('password', user.password)).toBe(true);
    });

    test('with an existing email address', async () => {
        const userInfo = {
            firstName: 'test',
            lastName: 'user',
            email: 'testuser@email.com',
            password: 'password',
        };

        await expect(createUser(userInfo)).rejects.toThrow();
    });
});

describe('logging in an existing user', () => {
    test('with correct credentials', async () => {
        const originalEnv = process.env;
        process.env.TOKEN_SECRET = 'secret';

        const [success, token] = await login('testuser@email.com', 'password');

        expect(success).toBe(true);
        expect(token).not.toEqual('');

        process.env = originalEnv;
    });

    test('with incorrect password', async () => {
        const [success, token] = await login(
            'testuser@email.com',
            'wrongpassword'
        );

        expect(success).toBe(false);
        expect(token).toEqual('');
    });

    test('with wrong email', async () => {
        const [success, token] = await login('notavalidemail', 'password');

        expect(success).toBe(false);
        expect(token).toEqual('');
    });
});

test('Casting a User to an Author', () => {
    const author = castUserToAuthor(mockUser);
    expect(author).toEqual({
        id: mockUser.id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        avatar: mockUser.avatar,
        email: mockUser.email,
        phoneNumber: mockUser.phoneNumber,
        rating: mockUser.rating,
    });

    expect(author).not.toEqual(mockUser);
});

describe('updating an existing user', () => {
    const mockUser = {
        id: '2',
        firstName: 'test',
        lastName: 'user',
        email: 'email@email.com',
        password: 'password',
        phoneNumber: '123-456-7890',
        rating: 50,
        workSamples: [],
        links: [],
        skills: [],
        education: [],
        experience: [],
        avatar: { source: '', id: '' },
        userProfile: {
            id: 1,
            featuredWork: '',
            description: '',
            headline: '',
        },
    };

    test('where all user properties are updated', async () => {
        const updatedUser = await updateUser(mockUser, {
            firstName: 'new',
            lastName: 'name',
            email: 'newemail@email.com',
            phoneNumber: '098-765-4321',
        });

        const expectedNewUser = {
            ...mockUser,
            firstName: 'new',
            lastName: 'name',
            email: 'newemail@email.com',
            phoneNumber: '098-765-4321',
        };

        expect(updatedUser.firstName).toEqual('new');
        expect(updatedUser.lastName).toEqual('name');
        expect(updatedUser.email).toEqual('newemail@email.com');
        expect(updatedUser.phoneNumber).toEqual('098-765-4321');
        expect(updatedUser).toEqual(expectedNewUser);
    });

    test('with only a subset of the properties updated', async () => {
        const updatedUser = await updateUser(mockUser, {
            firstName: 'new',
            lastName: 'name',
        });

        const expectedNewUser = {
            ...mockUser,
            firstName: 'new',
            lastName: 'name',
        };

        expect(updatedUser.firstName).toEqual('new');
        expect(updatedUser.lastName).toEqual('name');
        expect(updatedUser.email).toEqual('email@email.com');
        expect(updatedUser.phoneNumber).toEqual('123-456-7890');
        expect(updatedUser).toEqual(expectedNewUser);
    });

    test('with no fields updated', async () => {
        const updatedUser = await updateUser(mockUser, {});
        expect(updatedUser).toEqual(mockUser);
    });

    test('where updated email belongs to another account', async () => {
        await expect(
            updateUser(mockUser, { email: 'testuser@email.com' })
        ).rejects.toThrow();
    });
});

describe('deleting a User', () => {
    test('that exists', async () => {
        const rowsAffected = await deleteUser(mockUser);
        expect(rowsAffected).not.toBeNull();
        expect(rowsAffected).toBeDefined();
        expect(rowsAffected).toEqual(1);
    });

    test('that does not exist', async () => {
        const mockUser = {
            id: '2',
            firstName: 'test',
            lastName: 'user',
            email: 'nonexistent@email.com',
            password: 'password',
            phoneNumber: '123-456-7890',
            rating: 50,
            workSamples: [],
            links: [],
            skills: [],
            education: [],
            experience: [],
            avatar: { source: '', id: '' },
            userProfile: {
                id: 1,
                featuredWork: '',
                description: '',
                headline: '',
            },
        };

        const rowsAffected = await deleteUser(mockUser);

        expect(rowsAffected).not.toBeNull();
        expect(rowsAffected).toBeDefined();
        expect(rowsAffected).toEqual(0);
    });
});
