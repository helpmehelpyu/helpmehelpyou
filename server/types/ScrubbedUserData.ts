import { Education } from '../models/Education';
import { Experience } from '../models/Experience';
import { Link } from '../models/Link';
import { Media } from '../models/Media';
import { UserProfile } from '../models/UserProfile';

export interface ScrubbedUserData {
    id: string;

    firstName: string;

    lastName: string;

    email: string;

    phoneNumber: string;

    rating: number;

    workSamples?: Media[];

    links?: Link[];

    skills: string[];

    experience?: Experience[];

    education?: Education[];

    avatar: { source: string; id: string };

    userProfile?: UserProfile;
}
