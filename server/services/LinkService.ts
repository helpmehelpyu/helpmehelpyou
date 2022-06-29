import { AppDataSource } from '../database/DataSource';
import { Link } from '../models/Link';
import { User } from '../models/User';

export const deleteAssociatedLinks = async function (userId: string) {
    const linkRepository = AppDataSource.getRepository(Link);
    const associatedLinks = await linkRepository
        .createQueryBuilder('user')
        .where('user.ownerId = :userId', { userId: userId })
        .getMany();

    await linkRepository.remove(associatedLinks);
};

export const createNewLink = async function (
    user: User,
    linkInfo: { [x: string]: any }
): Promise<Link> {
    const linkRepository = AppDataSource.getRepository(Link);
    const newLink = await linkRepository.create(linkInfo);

    newLink.owner = user;

    await linkRepository.save(newLink);
    return newLink;
};

export const findLinkById = async function (
    linkId: number
): Promise<Link | null> {
    return AppDataSource.getRepository(Link).findOne({
        where: { id: linkId },
        relations: { owner: true },
    });
};

export const updateLink = async function (
    link: Link,
    name: string,
    url: string
): Promise<Link> {
    link.name = name;
    link.url = url;

    return AppDataSource.getRepository(Link).save(link);
};
