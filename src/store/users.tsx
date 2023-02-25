import {makeAutoObservable} from "mobx";

interface IUser {
  name: string;
  birthday: Date;
  avatar: string;
  email?: string;
  password?: string;
  gender?: string;
}

interface IUsersStore {
  token: string | null;
  account: Partial<IUser> | null;
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
