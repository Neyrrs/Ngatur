export interface IUser {
  id: number;
  username: string;
  profile: string;
}

export interface IUpdateProfile {
  id: number;
  username: string;
  profile: string;
  password: string;
}

export interface IUpdateProfilePicture {
  file: FileList;
}
