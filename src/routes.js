import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Autopost from './views/Autopost';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        true === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}
    />
  );
}

const Routes = (
  <div>
    <PrivateRoute exact path="/" component={Autopost} />
    <PrivateRoute exact path="/autopost" component={Autopost} />
  </div>
);

export default Routes;
