import { Media } from './Media.entity';
import DataURIParser from 'datauri/parser';
import cloudinary from 'cloudinary';
import path from 'path';
import { User } from '../users/User.entity';
import userService = require('../users/UserService');
import mediaRepository = require('./MediaRepository');
import { MediaInfo } from './MediaInfo';
import { MediaResult } from './MediaResult';

export const findById = async function (
    mediaId: string
): Promise<Media | null> {
    return mediaRepository.findById(mediaId);
};

export const uploadMedia = async function (
    file: Express.Multer.File,
    author: User,
    mediaInfo: MediaInfo
): Promise<string> {
    const uploadedMedia = await uploadImageToCloud(file);

    const newMedia = await mediaRepository.createNewMedia(
        uploadedMedia.public_id,
        author,
        uploadedMedia.url,
        mediaInfo
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
    media: Media | null
): Promise<boolean> {
    if (!media) {
        return false;
    }
    return media.author.id === userId;
};

export const deleteById = async function (mediaId: string): Promise<boolean> {
    const success = await deleteImageFromCloudById(mediaId);
    if (!success) {
        return false;
    }

    const res = await mediaRepository.deleteById(mediaId);
    return res.affected === 1;
};

export const deleteAssociatedMedia = async function (userId: string) {
    const user = await userService.findById(userId, { workSamples: true });
    for (const media of user!.workSamples) {
        const success = await deleteImageFromCloudById(media.id);
        if (!success) {
            throw Error(`Image with id ${media.id} could not be deleted`);
        }
    }
    mediaRepository.deleteAllByAuthorId(userId);
};

export const deleteImageFromCloudById = async (
    mediaId: string
): Promise<boolean> => {
    if (mediaId === '') {
        return true;
    }

    const { error } = await cloudinary.v2.uploader.destroy(mediaId);
    if (error) {
        return false;
    }

    return true;
};

export const uploadImageToCloud = async (
    file: Express.Multer.File
): Promise<cloudinary.UploadApiResponse> => {
    const parser = new DataURIParser();

    const parsedFile = parser.format(
        path.extname(file.originalname),
        file.buffer
    ).content;

    if (!parsedFile) {
        throw Error('File could not be parsed');
    }

    return await cloudinary.v2.uploader.upload_large(parsedFile, {
        resource_type: 'auto',
        use_filename: false,
        unique_filename: true,
        chunk_size: 6000000,
    });
};
