export type signupPayload = {
  username: string;
  email: string;
  password: string;
};

export type signinPayload = {
  email: string;
  password: string;
};

export type changePasswordPayload = {
  email: string;
  oldPassword: string;
  newPassword: string;
};
