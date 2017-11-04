/*global FB*/

import React from 'react';
import { Button } from 'antd';
import { inject } from 'mobx-react';

function Login({ RootStore }) {
  return <Button onClick={() => RootStore.userStore.logIn()}>Login</Button>;
}

export default inject('RootStore')(Login);
