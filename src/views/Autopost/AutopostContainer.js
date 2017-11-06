import React, { Component } from 'react';
import Autopost from './Autopost';

const groups = [
  { id: 1, name: 'Challenge 22 - August' },
  { id: 2, name: 'Challenge 22 - September' }
];

class AutopostContainer extends Component {
  state = {};
  render() {
    return <Autopost groups={groups} />;
  }
}

export default AutopostContainer;
