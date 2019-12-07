export interface UserLoginModel {
  username: string;
  password: string;
}

export interface UserRegisterModel {
  fullname: string;
  mobile: string;
  password: string;
  identification: string;
}

export interface UserConfirmModel {
  MembershipId: number;
  Mobile: string;
  PIN: string;
}
