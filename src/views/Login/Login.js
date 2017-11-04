/*global FB*/

import React from 'react';
import { Button } from 'antd';

function facebookLogin() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      console.log('Logged in.');
    } else {
      FB.login();
    }
  });
}

function Login() {
  return <Button onClick={facebookLogin}>Login</Button>;
}

export default Login;
