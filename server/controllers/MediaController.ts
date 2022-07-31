import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import mediaService = require('../services/MediaService');

export const findMediaById = async (req: Request, res: Response) => {
    const mediaId = req.params.mediaId;
    let retrievedMedia = await mediaService.findById(mediaId);

    if (!retrievedMedia) {
        return res.status(404).json({
            type: 'Media Not Found Error',
            message: 'The media with the specified mediaId could not be found',
        });
    }

    const mediaResult = mediaService.castMediaToMediaResult(retrievedMedia);

    res.status(200).json(mediaResult);
};

export const uploadMedia = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty() || !req.file) {
            return res.status(400).json({
                fileError: req.file
                    ? undefined
                    : {
                          type: 'InvalidFileError',
                          message: 'Invalid file format or no data uploaded',
                      },
                validationErrors: errors.array(),
            });
        }

        const mediaId = await mediaService.uploadMedia(
            req.file,
            res.locals.user,
            {
                ...matchedData(req, {
                    locations: ['body'],
                    includeOptionals: true,
                }),
            }
        );

        res.status(201).json({ mediaId: mediaId });
    } catch (err) {
        res.status(500).json({
            fileError: {
                type: 'FileParseError',
                message: 'File could not be parsed',
            },
            validationErrors: [],
        });
    }
};

export const authorizeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const mediaId = req.params.mediaId;

    const media = await mediaService.findById(mediaId);

    if (!media) {
        return res.status(404).json({
            message: 'The media with the given mediaId could not be found',
        });
    }

    res.locals.media = media;

    if (!mediaService.isAuthor(res.locals.user.id, media)) {
        return res.status(403).json({
            message:
                'The current user is not authorized to perform this action',
        });
    }
    next();
};

export const updateMedia = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(400).json({
            errors: validationErrors.array(),
        });
    }

    const media = res.locals.media;

    const updatedMedia = await mediaService.updateMedia(media, {
        ...matchedData(req, { locations: ['body'] }),
    });
    const updatedMediaResult =
        mediaService.castMediaToMediaResult(updatedMedia);

    res.status(200).json(updatedMediaResult);
};

export const deleteMedia = async (req: Request, res: Response) => {
    const media = res.locals.media;

    const successfullyDeleted = await mediaService.deleteById(media.id);

    if (!successfullyDeleted) {
        return res.status(500).json({
            message: 'unable to delete the specified media id',
        });
    }

    res.sendStatus(200);
};
