import axios from "axios";
import {makeAutoObservable} from "mobx";

interface IAvatar {
  path: string;
  thumbnail: string;
}

export interface IUser {
  username: string;
  birthday: string;
  avatar: IAvatar;
  email?: string;
  password?: string;
  gender?: string;
}
export type UserPart = Partial<IUser>;
// export type UserFull = Required<IUser>;

interface IUsersStore {
  token: string | null;
  account: IUser | null;
  people: Array<IUser> | null;
  selectedUserId: number | null;
}

class User implements IUsersStore {
  token = null;
  account = null;
  people = null;
  selectedUserId = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchPeople() {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/people")
      .then((res) => {
        const me = (this.account as UserPart | null) || {};
        let peopleList = res.data.filter(
          (x: IUser) => x.username !== me.username
        );
        this.people = peopleList;
      })
      .catch((e) => {
        console.error("People get error", e);
      });
  }
}

const store = new User();
export default store;
