export type UserType = {
  id: string;
  email: string;
  password: string;
  image?: string;
  name: string;
  role: string;
  isVerifiedEmail: string;
  default_address_id?: string;
};
