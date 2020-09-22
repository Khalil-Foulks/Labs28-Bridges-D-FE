import React, { useState } from 'react';
import './Footer.css';
import { Modal } from 'antd';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

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
        src="menubutton.svg"
        onClick={showModal}
        alt="Menu Button"
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
            <FacebookIcon
              className="socialText"
              fontSize="large"
              color="primary"
              style={{ color: 'white' }}
              onClick={() =>
                window.open(
                  'https://www.facebook.com/BridgestoProsperity/',
                  '_blank'
                )
              }
            >
              {' '}
            </FacebookIcon>

            <br></br>

            <TwitterIcon
              className="socialText"
              fontSize="large"
              color="primary"
              onClick={() =>
                window.open('https://twitter.com/b2p?lang=en/', '_blank')
              }
              style={{ color: 'white' }}
            ></TwitterIcon>

            <br></br>

            <InstagramIcon
              className="socialText"
              fontSize="large"
              color="primary"
              onClick={() =>
                window.open(
                  'https://www.instagram.com/bridgestoprosperity/',
                  '_blank'
                )
              }
              style={{ color: 'white' }}
            ></InstagramIcon>

            <br></br>

            <LinkedInIcon
              className="socialText"
              fontSize="large"
              color="primary"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/company/bridges-to-prosperity',
                  '_blank'
                )
              }
              style={{ color: 'white' }}
            ></LinkedInIcon>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default B2PFooter;
