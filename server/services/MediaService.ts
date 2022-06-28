import { Media } from '../models/Media';
import { AppDataSource } from '../database/DataSource';
import DataURIParser from 'datauri/parser';
import cloudinary from 'cloudinary';
import path from 'path';
import { User } from '../models/User';
import { MediaResult } from '../types/MediaResult';
import userService = require('../services/UserService');

export const findByMediaId = async function (
    mediaId: string
): Promise<Media | null> {
    return AppDataSource.getRepository(Media).findOne({
        where: {
            id: mediaId,
        },
        relations: {
            author: true,
        },
    });
};

export const uploadMedia = async function (
    file: Express.Multer.File,
    author: User,
    mediaInfo: { [x: string]: any }
): Promise<string> {
    const parser = new DataURIParser();

    const parsedFile = parser.format(
        path.extname(file.originalname),
        file.buffer
    ).content;

    if (!parsedFile) {
        throw Error('File could not be parsed');
    }

    const uploadedMedia = await cloudinary.v2.uploader.upload_large(
        parsedFile,
        {
            resource_type: 'auto',
            use_filename: false,
            unique_filename: true,
            chunk_size: 6000000,
        }
    );

    const mediaRepository = AppDataSource.getRepository(Media);
    const media = mediaRepository.create({
        id: uploadedMedia.public_id,
        author: author,
        source: uploadedMedia.url,
        ...mediaInfo,
    });

    await mediaRepository.save(media);

    return media.id;
};

export const castMediaToMediaResult = function (media: Media): MediaResult {
    const author = userService.castUserToAuthor(media.author);
    return {
        ...media,
        author: author,
    };
};

export const updateMedia = async function (
    media: Media,
    updatedProperties: { [x: string]: any }
): Promise<Media> {
    media = {
        ...media,
        ...updatedProperties,
    };
    return AppDataSource.getRepository(Media).save(media);
};

export const isAuthor = async function (
    userId: string,
    media: Media
): Promise<boolean> {
    return media.author.id === userId;
};

export const deleteMedia = async function (
    media: Media
): Promise<number | null | undefined> {
    const res = await AppDataSource.getRepository(Media).delete({
        id: media.id,
    });
    return res.affected;
};

export const deleteAssociatedMedia = async function (userId: string) {
    const mediaRepository = AppDataSource.getRepository(Media);
    const associatedMedia = await mediaRepository
        .createQueryBuilder('user')
        .where('user.authorId = :userId', { userId: userId })
        .getMany();

    await mediaRepository.remove(associatedMedia);
};
