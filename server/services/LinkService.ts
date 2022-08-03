import { Link } from '../models/Link';
import { User } from '../models/User';
import linkRepository = require('../repository/LinkRepository');
import { LinkInfo } from '../types/LinkInfo';

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
