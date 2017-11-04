import UserStore from './UserStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
  }
}

export default RootStore;
