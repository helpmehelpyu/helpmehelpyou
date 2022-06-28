import { AppDataSource } from '../database/DataSource';
import { Link } from '../models/Link';

export const deleteAssociatedLinks = async function (userId: string) {
    const linkRepository = AppDataSource.getRepository(Link);
    const associatedLinks = await linkRepository
        .createQueryBuilder('user')
        .where('user.ownerId = :userId', { userId: userId })
        .getMany();

    await linkRepository.remove(associatedLinks);
};
