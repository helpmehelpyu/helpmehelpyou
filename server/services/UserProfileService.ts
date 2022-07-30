import userProfileRepository = require('../repository/UserProfileRepository');

export const deleteById = async (id: number) => {
    userProfileRepository.deleteById(id);
};
