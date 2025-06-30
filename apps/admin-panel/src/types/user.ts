export interface User {
  id: number;
  name: string;
  email: string;
  permissions: { [key: string]: boolean };
  roles: string[];
}
