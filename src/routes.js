import React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import Autopost from './views/Autopost';

const PrivateRoute = inject('RootStore')(
  observer(({ component: Component, RootStore, ...rest }) => {
    const { userStore } = RootStore;
    return (
      <Route
        {...rest}
        render={props =>
          userStore.authed ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )}
      />
    );
  })
);

const Routes = (
  <div>
    <PrivateRoute exact path="/" component={Autopost} />
    <PrivateRoute exact path="/autopost" component={Autopost} />
  </div>
);

export default Routes;
