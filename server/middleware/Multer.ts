import multer from 'multer';

const whitelist = new Set([
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'video/mp4',
    'video/mov',
    'video/webm',
    'video/ogg',
]);

const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!whitelist.has(file.mimetype)) {
            return cb(null, false); // reject the file
        }

        // otherwise accept the file and pass it along
        cb(null, true);
    },

    // limits: {
    // fileSize: add a file size to prevent all memory being used up
    // },
});
