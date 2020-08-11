import React from 'react';
import { Layout } from 'antd';
import './Main.css';

//destructing components out of Layout component
const { Header } = Layout;
const { Sider } = Layout;
const { Content } = Layout;
const { Footer } = Layout;

const Main = () => {
  return (
    <div>
      <Layout>
        <Header className="header">
          <img className="logo" src="B2P_Symbol_Green.svg" alt="B2P Logo" />
        </Header>
        <Layout>
          <Sider width="30vw" className="sidebar">
            <h1>Bridges</h1>
          </Sider>
          <Content className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            <div>Random text</div>
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Content>
        </Layout>
        <Footer className="footer">footer</Footer>
      </Layout>
    </div>
  );
};

export default Main;
