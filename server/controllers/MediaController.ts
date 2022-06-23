import { Request, Response } from 'express';
import mediaService = require('../services/MediaService');

export const fetchMediaById = (req: Request, res: Response) => {
    const mediaId = req.params.mediaId;
    let retrievedMedia = mediaService.findById(mediaId);

    if (!retrievedMedia) {
        return res.status(404).json({
            type: 'Media Not Found Error',
            description:
                'The media with the specified mediaId could not be found',
        });
    }

    res.status(200).json(retrievedMedia);
};

export const uploadMedia = (req: Request, res: Response) => {};
