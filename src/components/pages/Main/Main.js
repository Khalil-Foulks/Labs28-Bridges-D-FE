import React from 'react';
import { Layout } from 'antd';
import './Main.css';
import Map from '../Map/Map';
import Store from '../Store';

//destructing components out of Layout component
const { Content } = Layout;

const Main = () => {
  return (
    <div>
      <Layout>
        <Store>
          <Layout className="layout">
            <Content className="content">
              <Map />
            </Content>
          </Layout>
        </Store>
      </Layout>
    </div>
  );
};

export default Main;
