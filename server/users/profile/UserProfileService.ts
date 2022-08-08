import userProfileRepository = require('./UserProfileRepository');

export const deleteById = async (id: number) => {
    userProfileRepository.deleteById(id);
};
