import { Author } from './Author';
import { Link } from './Link';
import { WorkSample } from './WorkSample';

export interface UserData extends Author {
  email: string;
  phoneNumber: string;
  rating: number;
  links: Link[];
  workSamples: WorkSample[];
}
