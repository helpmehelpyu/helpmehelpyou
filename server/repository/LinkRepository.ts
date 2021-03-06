import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../database/DataSource';
import { Link } from '../models/Link';
import { User } from '../models/User';

const linkDAO = AppDataSource.getRepository(Link);

export const findById = async (linkId: number): Promise<Link | null> => {
    return linkDAO.findOne({
        where: { id: linkId },
        relations: { owner: true },
    });
};

export const updateLink = async function (updatedLink: Link): Promise<Link> {
    return linkDAO.save(updatedLink);
};

export const deleteById = async (linkId: number): Promise<DeleteResult> => {
    return linkDAO.delete({
        id: linkId,
    });
};

export const createNewLink = async function (
    owner: User,
    linkInfo: { [x: string]: any }
): Promise<Link> {
    const newLink = await linkDAO.create(linkInfo);

    newLink.owner = owner;

    return linkDAO.save(newLink);
};

export const deleteAllLinksByOwnerId = async (ownerId: string) => {
    const associatedLinks = await linkDAO
        .createQueryBuilder('user')
        .where('user.ownerId = :ownerId', { ownerId: ownerId })
        .getMany();

    await linkDAO.remove(associatedLinks);
};
