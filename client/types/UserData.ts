import { Author } from './Author';
import { Education } from './Education';
import { Experience } from './Experience';
import { Link } from './Link';
import { Skill } from './Skill';
import { UserProfile } from './UserProfile';
import { WorkSample } from './WorkSample';

export interface UserData extends Author {
  links: Link[];
  workSamples: WorkSample[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  userProfile: UserProfile;
}
