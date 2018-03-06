import React from 'react';
import { Button, Icon } from 'antd';
import { inject } from 'mobx-react';
import './Login.css';

function logInPrompt(userStore, history) {
  userStore
    .logIn()
    .then(res => history.push('/'))
    .catch(err => console.error(err));
}

function Login({ RootStore, history }) {
  return (
    <div className="login-page">
      <div className="login-page-content">
        <h1 className="login-page-title">Challenge 22 Admin</h1>
        <div className="login-page-text">
          <p>Welcome to Challenge 22 admin dashboard!</p>
          <p>Please log in using the button below.</p>
        </div>
        <Button onClick={() => logInPrompt(RootStore.userStore, history)}>
          <Icon type="login" />Login with Facebook
        </Button>
      </div>
      <footer>
        <a href="/privacy-policy.html">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default inject('RootStore')(Login);
