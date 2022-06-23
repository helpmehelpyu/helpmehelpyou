import { Media } from '../models/Media';
import { AppDataSource } from '../database/DataSource';

export const findById = async (mediaId: string): Promise<Media | null> => {
    return await AppDataSource.getRepository(Media).findOneBy({ id: mediaId });
};
