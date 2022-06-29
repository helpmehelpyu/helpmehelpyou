import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../database/DataSource';
import { Media } from '../models/Media';
import { User } from '../models/User';

const mediaDAO = AppDataSource.getRepository(Media);

export const findById = async (mediaId: string): Promise<Media | null> => {
    return mediaDAO.findOne({
        where: {
            id: mediaId,
        },
        relations: {
            author: true,
        },
    });
};

export const createNewMedia = async (
    mediaId: string,
    author: User,
    source: string,
    mediaInfo: { [x: string]: any }
): Promise<Media> => {
    const media = mediaDAO.create({
        id: mediaId,
        author: author,
        source: source,
        ...mediaInfo,
    });

    return mediaDAO.save(media);
};

export const updateMedia = async (updatedMedia: Media): Promise<Media> => {
    return mediaDAO.save(updatedMedia);
};

export const deleteById = async (mediaId: string): Promise<DeleteResult> => {
    return AppDataSource.getRepository(Media).delete({
        id: mediaId,
    });
};

export const deleteAllByAuthorId = async (authorId: string) => {
    const associatedMedia = await mediaDAO
        .createQueryBuilder('user')
        .where('user.authorId = :authorId', { authorId: authorId })
        .getMany();

    await mediaDAO.remove(associatedMedia);
};
