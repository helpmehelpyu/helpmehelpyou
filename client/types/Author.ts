export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rating: number;
  avatar: { source: string; id: string };
}
