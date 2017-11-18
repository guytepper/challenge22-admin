/*global FB*/

import { observable, computed, action, runInAction } from 'mobx';

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable user = {};
  @observable token = '';

  @computed
  get authed() {
    return this.user.id;
  }

  @action
  logIn() {
    return new Promise((resolve, reject) => {
      FB.login(
        response => {
          console.log(response.authResponse.accessToken);
          if (response.status === 'connected') {
            runInAction('Update Token', () => (this.token = response.authResponse.accessToken));
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
      runInAction('Update Token', () => (this.token = ''));
      runInAction('Update User', () => (this.user = {}));
    });
  }
}

export default UserStore;
