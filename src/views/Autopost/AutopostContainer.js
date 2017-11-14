import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Autopost from './Autopost';

@observer
@inject('RootStore')
class AutopostContainer extends Component {
  state = {};

  render() {
    const { groups } = this.props.RootStore.userStore.user;
    return <Autopost groups={groups.data} />;
  }
}

export default AutopostContainer;
