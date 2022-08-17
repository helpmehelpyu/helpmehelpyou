import { Author } from './Author';
import { Education } from './Education';
import { Experience } from './Experience';
import { Link } from './Link';
import { Skill } from './Skill';
import { UserProfile } from './UserProfile';
import { WorkSample } from './WorkSample';

export interface UserData extends Author {
  email: string;
  phoneNumber: string;
  rating: number;
  links: Link[];
  workSamples: WorkSample[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  avatar: { source: string; id: string };
  userProfile: UserProfile;
}
