import React from 'react';
import { Layout } from 'antd';
import './Main.css';
import Map from '../Map/Map';

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
            <Map />
          </Content>
        </Layout>
        <Footer className="footer">footer</Footer>
      </Layout>
    </div>
  );
};

export default Main;
