/*global FB*/

import { observable, computed, action, runInAction } from 'mobx';

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable User = {};

  @computed
  get authed() {
    return this.User.userID;
  }

  @action
  logIn() {
    FB.login(
      response => {
        if (response.status === 'connected') {
          const { userID } = response.authResponse;
          FB.api('/me', { fields: ['picture', 'first_name', 'last_name'] }, res => {
            runInAction('Update User', () => (this.User = res));
          });
        } else {
          console.log('wat');
        }
      },
      { scope: 'user_managed_groups,user_photos,publish_actions' }
    );
  }
}

export default UserStore;
