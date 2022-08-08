import linkRepository = require('./LinkRepository');
import { LinkInfo } from './LinkInfo';
import { Link } from './Link.entity';
import { User } from '../User.entity';

export const deleteAssociatedLinks = async function (userId: string) {
    linkRepository.deleteAllLinksByOwnerId(userId);
};

export const createNewLink = async function (
    user: User,
    linkInfo: LinkInfo
): Promise<Link> {
    const newLink = linkRepository.createNewLink(user, linkInfo);
    return newLink;
};

export const findById = async function (linkId: number): Promise<Link | null> {
    return linkRepository.findById(linkId);
};

export const updateLink = async function (
    link: Link,
    name: string,
    url: string
): Promise<Link> {
    link.name = name;
    link.url = url;

    return linkRepository.updateLink(link);
};

export const deleteLink = async function (
    linkId: number
): Promise<number | null | undefined> {
    const result = await linkRepository.deleteById(linkId);
    return result.affected;
};
