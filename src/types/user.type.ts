export type UserType = {
  id: string;
  email: string;
  password: string;
  image?: string;
  name: string;
  role: string;
  verified: boolean;
  default_address_id?: string;
};
