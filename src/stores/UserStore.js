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
    return new Promise((resolve, reject) => {
      FB.login(
        response => {
          if (response.status === 'connected') {
            const { userID } = response.authResponse;
            FB.api('/me', { fields: ['picture', 'first_name', 'last_name'] }, res => {
              runInAction('Update User', () => (this.User = res));
              resolve(response);
            });
          } else {
            reject(response);
          }
        },
        { scope: 'user_managed_groups,user_photos,publish_actions' }
      );
    });
  }
}

export default UserStore;
