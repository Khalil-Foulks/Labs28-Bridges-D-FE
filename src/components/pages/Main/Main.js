import React from 'react';
import { Layout } from 'antd';
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinFilled,
} from '@ant-design/icons';
import './Main.css';
import Map from '../Map/Map';
import Store from '../Store';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import B2PFooter from '../Footer/Footer';

//destructing components out of Layout component
// const { Header } = Layout;

const { Content } = Layout;
const { Footer } = Layout;

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
