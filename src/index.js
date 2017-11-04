import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import routes from './routes';
import SiteLayout from './components/SiteLayout';
import Login from './views/Login';
import RootStore from './stores/RootStore';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider RootStore={new RootStore()}>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" render={() => <SiteLayout routes={routes} />} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
