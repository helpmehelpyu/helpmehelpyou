import { AppDataSource } from '../../database/DataSource';
import { User } from '../User.entity';
import { Skill } from './Skill.entity';

const skillsDAO = AppDataSource.getRepository(Skill);

export const findByName = (name: string): Promise<Skill | null> => {
    return skillsDAO.findOne({
        where: { name: name },
        relations: {
            users: true,
        },
    });
};

export const findById = (id: number): Promise<Skill | null> => {
    return skillsDAO.findOne({
        where: { id: id },
        relations: {
            users: true,
        },
    });
};

export const updateSkill = async (updatedSkill: Skill): Promise<Skill> => {
    return await skillsDAO.save(updatedSkill);
};

export const createNewSkill = (skillName: string): Skill => {
    return skillsDAO.create({ name: skillName, users: [] });
};

export const deleteSkillFromUser = async (
    userId: string,
    skillsId: number
): Promise<number> => {
    const res = await AppDataSource.manager.query(
        'DELETE FROM skill_users WHERE "skill_users"."skillId" = $1 AND "skill_users"."userId" = $2',
        [skillsId, userId]
    );

    return res[1];
};

export const deleteSkillById = async (skillId: number) => {
    await skillsDAO
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: skillId })
        .execute();
};

export const getUsersWithSkill = async (
    skillName: string,
    limit: number,
    page: number
): Promise<User[]> => {
    const skill = await skillsDAO
        .createQueryBuilder('skill')
        .select([
            'skill.id',
            'User.id',
            'User.firstName',
            'User.lastName',
            'User.email',
            'User.phoneNumber',
            'User.rating',
            'User.avatar',
        ])
        .innerJoin('skill.users', 'User')
        .where('name = :skillName', { skillName: skillName })
        .offset(page * limit)
        .limit(limit)
        .getOne();

    if (!skill) {
        return [];
    }
    return skill.users;
};
