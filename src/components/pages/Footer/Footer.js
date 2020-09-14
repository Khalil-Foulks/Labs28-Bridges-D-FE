import React, { useState } from 'react';
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinFilled,
} from '@ant-design/icons';
import './Footer.css';
import { Modal } from 'antd';
const B2PFooter = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    if (visible === true) setVisible(false);
    if (visible === false) setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const bodyStyle = {
    display: 'block',
    height: '30vh',
    lineHeight: '1px',
    backgroundColor: '#161345',
  };

  return (
    <>
      <img
        className="logo"
        src="B2P_Symbol_GreenSmall.svg"
        onClick={showModal}
      ></img>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        bodyStyle={bodyStyle}
        width={1000}
        footer={null}
      >
        <div className="container">
          <div className="Info">
            <img
              className="logoFtr"
              src="B2P_Symbol_White.svg"
              alt="B2P Logo"
            />

            <a className="address">
              3858 Walnut St., Suite 219 Denver, Colorado 80205
            </a>
            <br></br>

            <a className="address">
              2018 © Bridges to Prosperity. All rights reserved.
            </a>
            <br></br>
          </div>
          <div className="WebsiteLinks">
            <a
              className="singlePageLinks"
              href="https://bridgestoprosperity.org/"
            >
              Home
            </a>
            <br></br>

            <a
              className="singlePageLinks"
              href="https://bridgestoprosperity.org/join-us/"
            >
              Join Us
            </a>
            <br></br>

            <a
              className="singlePageLinks"
              href="https://bridgestoprosperity.org/faqs/"
            >
              FAQs
            </a>
            <br></br>

            <a
              className="singlePageLinks"
              href="https://bridgestoprosperity.org/contact//"
            >
              Contact Us
            </a>
          </div>

          <div className="SocialLinks">
            <FacebookFilled
              className="socialText"
              style={{ fontSize: '30px', color: 'white', marginRight: '3px' }}
            />
            <a
              className="socialText"
              href="https://www.facebook.com/BridgestoProsperity/"
            >
              - @BridgestoProsperity
            </a>{' '}
            <br></br>
            <TwitterOutlined
              className="socialText"
              style={{
                fontSize: '30px',
                color: 'white',
                marginRight: '-1px',
                marginTop: '3px',
              }}
            />
            <a className="socialText" href="https://twitter.com/b2p">
              {' '}
              - @B2P
            </a>
            <br></br>
            <InstagramOutlined
              className="socialText"
              style={{
                fontSize: '30px',
                color: 'white',
                marginRight: '3px',
                marginTop: '3px',
              }}
            />
            <a
              className="socialText"
              href="https://www.instagram.com/bridgestoprosperity/"
            >
              - @bridgestoprosperity
            </a>
            <br></br>
            <LinkedinFilled
              className="socialText"
              style={{
                fontSize: '30px',
                color: 'white',
                marginRight: '3px',
                marginTop: '3px',
              }}
            />
            <a
              className="socialText"
              href="https://www.linkedin.com/company/bridges-to-prosperity"
            >
              - Bridges to Prosperity
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default B2PFooter;
