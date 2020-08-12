import React from 'react';
import { Layout } from 'antd';
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinFilled,
} from '@ant-design/icons';
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
