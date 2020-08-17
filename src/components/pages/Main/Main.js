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
        <Footer className="footer">
          <div className="ftrWebsiteLinks">
            <a href="https://bridgestoprosperity.org/">Home</a> <br></br>
            <a href="https://bridgestoprosperity.org/join-us/">Join Us</a>
            <br></br>
            <a href="https://bridgestoprosperity.org/faqs/">FAQs</a>
            <br></br>
            <a href="https://bridgestoprosperity.org/contact//">Contact Us</a>
          </div>
          <div className="ftrSocialLinks">
            <FacebookFilled style={{ fontSize: '20px' }} />
            <a href="https://www.facebook.com/BridgestoProsperity/">
              {' '}
              - @BridgestoProsperity
            </a>
            <br></br>
            <TwitterOutlined style={{ fontSize: '20px' }} />
            <a href="https://twitter.com/b2p"> - @B2P</a>
            <br></br>
            <InstagramOutlined style={{ fontSize: '20px' }} />
            <a href="https://www.instagram.com/bridgestoprosperity/">
              {' '}
              - @bridgestoprosperity
            </a>
            <br></br>
            <LinkedinFilled style={{ fontSize: '20px' }} />
            <a href="https://www.linkedin.com/company/bridges-to-prosperity">
              {' '}
              - Bridges to Prosperity
            </a>
          </div>
          <div className="ftrInfo">
            <img
              className="logoFtr"
              src="B2P_Symbol_White.svg"
              alt="B2P Logo"
            />
            <h5>
              3858 Walnut St., Suite 219 Denver, Colorado 80205 EIN: 54-2031102
            </h5>
            <h6>2018 © Bridges to Prosperity. All rights reserved.</h6>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default Main;
