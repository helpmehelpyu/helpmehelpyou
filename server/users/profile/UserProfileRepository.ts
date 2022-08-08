import { AppDataSource } from "../../database/DataSource";
import { UserProfile } from "./UserProfile.entity";

const userProfileDAO = AppDataSource.getRepository(UserProfile);

export const createDefaultUserProfile = async (): Promise<UserProfile> => {
    const newUserProfile = await userProfileDAO.create();
    await userProfileDAO.save(newUserProfile);
    return newUserProfile;
};

export const deleteById = async (id: number) => {
    userProfileDAO.delete({ id: id });
};
