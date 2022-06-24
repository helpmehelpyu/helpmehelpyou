import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mediaService = require('../services/MediaService');

export const findMediaById = (req: Request, res: Response) => {
    const mediaId = req.params.mediaId;
    let retrievedMedia = mediaService.findById(mediaId);

    if (!retrievedMedia) {
        return res.status(404).json({
            type: 'Media Not Found Error',
            description:
                'The media with the specified mediaId could not be found',
        });
    }
    console.log(retrievedMedia);

    res.status(200).json(retrievedMedia);
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
            req.body.title,
            req.body.description,
            req.body.user
        );

        res.status(201).json({ mediaId: mediaId });
    } catch (err) {
        res.status(400).json({
            fileError: {
                type: 'FileParseError',
                message: 'File could not be parsed',
            },
            validationErrors: [],
        });
    }
};
