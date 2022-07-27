import { Author } from './Author';
import { WorkSample } from './WorkSample';

export interface MediaResult extends WorkSample {
  author: Author;
}
