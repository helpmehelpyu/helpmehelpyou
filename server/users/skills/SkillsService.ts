import { User } from '../User.entity';
import { Skill } from './Skill.entity';
import skillsRepository = require('./SkillsRespository');

export const findByName = (name: string): Promise<Skill | null> => {
    return skillsRepository.findByName(name);
};

// TODO: This function is O(n), where n is the length of the skills array
// it is definitely possible to get it to O(1) other methods such as hash maps.
// it's just not possible to store that in the db. Is it possible to restrict array to distinct values only?
// This is definitely worth optimizing in the future though, don't prematurely optimize.
export const hasSkill = (skills: Skill[], skillName: string): Boolean => {
    for (const skill of skills) {
        if (skill.name === skillName) {
            return true;
        }
    }
    return false;
};

export const createNewSkill = (skillName: string): Skill => {
    return skillsRepository.createNewSkill(skillName);
};

export const addUserToExistingSkill = (
    user: User,
    existingSkill: Skill
): Promise<Skill> => {
    existingSkill.users.push(user);
    return skillsRepository.updateSkill(existingSkill);
};

export const deleteSkillFromUser = async (
    userId: string,
    skillId: number
): Promise<number> => {
    const rowsDelete = skillsRepository.deleteSkillFromUser(userId, skillId);

    // check if the skill has no users
    const skill = await skillsRepository.findById(skillId);

    // if the skill has no users, delete it
    if (skill!.users.length == 0) {
        skillsRepository.deleteSkillById(skillId);
    }

    return rowsDelete;
};

export const getUsersWithSkill = (
    skillName: string,
    limit: number,
    page: number
): Promise<User[]> => {
    return skillsRepository.getUsersWithSkill(skillName, limit, page);
};
