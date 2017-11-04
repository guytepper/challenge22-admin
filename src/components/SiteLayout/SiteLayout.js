import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function SiteLayout({ routes }) {
  return (
    <Layout>
      <Sider
        breakpoint="xs"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="share-alt" />
            <span className="nav-text">Autopost</span>
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

export default SiteLayout;