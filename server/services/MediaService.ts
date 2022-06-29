import { Media } from '../models/Media';
import DataURIParser from 'datauri/parser';
import cloudinary from 'cloudinary';
import path from 'path';
import { User } from '../models/User';
import { MediaResult } from '../types/MediaResult';
import userService = require('../services/UserService');
import mediaRepository = require('../repository/MediaRepository');

export const findById = async function (
    mediaId: string
): Promise<Media | null> {
    return mediaRepository.findById(mediaId);
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

    const newMedia = await mediaRepository.createNewMedia(
        uploadedMedia.public_id,
        author,
        uploadedMedia.url,
        { ...mediaInfo }
    );

    return newMedia.id;
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

    return mediaRepository.updateMedia(media);
};

export const isAuthor = async function (
    userId: string,
    media: Media
): Promise<boolean> {
    return media.author.id === userId;
};

export const deleteById = async function (
    mediaId: string
): Promise<number | null | undefined> {
    const res = await mediaRepository.deleteById(mediaId);
    return res.affected;
};

export const deleteAssociatedMedia = async function (userId: string) {
    mediaRepository.deleteAllByAuthorId(userId);
};
