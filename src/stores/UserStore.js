/*global FB*/

import { observable, computed, action, runInAction } from 'mobx';

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable user = {};

  @computed
  get authed() {
    return this.user.id;
  }

  @action
  logIn() {
    return new Promise((resolve, reject) => {
      FB.login(
        response => {
          if (response.status === 'connected') {
            FB.api('/me', { fields: ['picture', 'first_name', 'last_name', 'groups'] }, res => {
              runInAction('Update User', () => (this.user = res));
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

  @action
  logOut() {
    FB.logout(response => {
      runInAction('Update User', () => (this.user = {}));
    });
  }
}

export default UserStore;
