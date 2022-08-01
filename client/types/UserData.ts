import { Author } from './Author';
import { Education } from './Education';
import { Experience } from './Experience';
import { Link } from './Link';
import { UserProfile } from './UserProfile';
import { WorkSample } from './WorkSample';

export interface UserData extends Author {
  id: string;
  email: string;
  phoneNumber: string;
  rating: number;
  links: Link[];
  workSamples: WorkSample[];
  experience: Experience[];
  education: Education[];
  avatar: { source: string; id: string };
  userProfile: UserProfile;
}
