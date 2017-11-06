import React from 'react';
import { inject } from 'mobx-react';
import { Layout, Menu, Icon } from 'antd';
import './SiteLayout.css';

const { Header, Content, Footer, Sider } = Layout;

function SiteLayout({ routes, history, RootStore }) {
  const { userStore } = RootStore;
  return (
    <Layout>
      <Sider
        breakpoint="xs"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">Challenge 22</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Icon type="share-alt" />
            <span className="nav-text" onClick={() => console.log(1)}>
              Autopost
            </span>
          </Menu.Item>
          <Menu.Item key="2" style={{ marginTop: 20 }}>
            <Icon type="logout" />
            <span
              className="nav-text"
              onClick={() => {
                userStore.logOut();
                history.push('/login');
              }}
            >
              Logout
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{routes}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Challenge 22 Admin Toolkit</Footer>
      </Layout>
    </Layout>
  );
}

export default inject('RootStore')(SiteLayout);
