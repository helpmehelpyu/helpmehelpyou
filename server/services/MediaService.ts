import { Media } from '../models/Media';
import { AppDataSource } from '../database/DataSource';
import DataURIParser from 'datauri/parser';
import cloudinary from 'cloudinary';
import path from 'path';
import { User } from '../models/User';

export const findById = async function (
    mediaId: string
): Promise<Media | null> {
    return await AppDataSource.getRepository(Media).findOneBy({ id: mediaId });
};

export const uploadMedia = async function (
    file: Express.Multer.File,
    title: string,
    description: string,
    author: User
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
        title: title,
        description: description,
    });

    await mediaRepository.save(media);

    return media.id;
};
