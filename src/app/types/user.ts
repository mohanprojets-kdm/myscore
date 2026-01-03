export type UserCreateBody = {
  name: string;
  email: string;
  password: string;
  gender: "MALE" | "FEMALE";
};
