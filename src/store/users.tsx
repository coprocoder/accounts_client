import {makeAutoObservable} from "mobx";

interface IAvatar {
  path: string;
  thumbnail: string;
}

export interface IUser {
  username: string;
  birthday: Date;
  avatar: IAvatar;
  email?: string;
  password?: string;
  gender?: string;
}
export type UserPart = Partial<IUser>;
// export type UserFull = Required<IUser>;

interface IUsersStore {
  token: string | null;
  account: UserPart | null;
  people: Array<IUser>;
}

class User implements IUsersStore {
  token = null;
  account = null;
  people = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetch() {
    const server_url = process.env.REACT_APP_SERVER_URL;
    const url = server_url + "/account";

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new User();
