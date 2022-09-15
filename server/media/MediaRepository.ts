import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../database/DataSource';
import { Media } from '../media/Media.entity';
import { User } from '../users/User.entity';
import { MediaInfo } from '../media/MediaInfo';

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
    mediaInfo: MediaInfo
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
    await mediaDAO
        .createQueryBuilder()
        .delete()
        .where('authorId = :authorId', { authorId: authorId })
        .execute();
};

export const getMedia = async (
    ascending: boolean,
    page: number,
    limit: number
): Promise<Media[]> => {
    return mediaDAO
        .createQueryBuilder('media')
        .leftJoin('media.author', 'author')
        .addSelect([
            'author.id',
            'author.firstName',
            'author.lastName',
            'author.email',
            'author.phoneNumber',
            'author.rating',
            'author.avatar',
        ])
        .offset(limit * page)
        .limit(limit)
        .orderBy('media.uploadDate',  ascending ? 'ASC' : 'DESC')
        .getMany();
};
