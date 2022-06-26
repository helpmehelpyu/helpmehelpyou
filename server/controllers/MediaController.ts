import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import mediaService = require('../services/MediaService');

export const findMediaById = async (req: Request, res: Response) => {
    const mediaId = req.params.mediaId;
    let retrievedMedia = await mediaService.findByMediaId(mediaId);

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
                    ? {}
                    : {
                          type: 'InvalidFileError',
                          message: 'Invalid file format or no data uploaded',
                      },
                validationErrors: errors.array(),
            });
        }

        const mediaId = await mediaService.uploadMedia(
            req.file,
            req.body.user,
            mediaService.castMatchedDataToMediaInfo({
                ...matchedData(req, {
                    locations: ['body'],
                    includeOptionals: true,
                }),
            })
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

export const updateMedia = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(400).json({
            errors: validationErrors.array(),
        });
    }

    const mediaId = req.params.mediaId;

    const media = await mediaService.findByMediaId(mediaId);

    if (!media) {
        return res.status(404).json({
            message: 'The media with the given mediaId could not be found',
        });
    }

    if (!mediaService.isAuthor(req.body.user, media)) {
        return res.status(403).json({
            message:
                'The current user is not authorized to perform this action',
        });
    }

    const updatedProperties = mediaService.castMatchedDataToMediaInfo({
        ...matchedData(req, { locations: ['body'] }),
    });

    const updatedMedia = await mediaService.updateMedia(
        media,
        updatedProperties
    );
    const updatedMediaResult =
        mediaService.castMediaToMediaResult(updatedMedia);

    res.status(200).json(updatedMediaResult);
};
