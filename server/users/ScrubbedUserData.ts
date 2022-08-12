import { Media } from '../media/Media.entity';
import { Education } from './education/Education.entity';
import { Experience } from './experience/Experience.entity';
import { Link } from './link/Link.entity';
import { UserProfile } from './profile/UserProfile.entity';
import { Skill } from './skills/Skill.entity';

export interface ScrubbedUserData {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  rating: number;

  workSamples?: Media[];

  links?: Link[];

  skills: Skill[];

  experience?: Experience[];

  education?: Education[];

  avatar: { source: string; id: string };

  userProfile?: UserProfile;
}
