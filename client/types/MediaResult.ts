import { Author } from "./Author";

export interface MediaResult {
  id: string;

  author: Author;

  source: string;

  title: string;

  description: string;

  uploadDate: string;
}
