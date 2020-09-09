import React from 'react';
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinFilled,
} from '@ant-design/icons';
import './Footer.css';
const B2PFooter = () => {
  return (
    <div className="footer">
      <div className="ftrWebsiteLinks">
        <a className="singlePageLinks" href="https://bridgestoprosperity.org/">
          Home
        </a>{' '}
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
      <div className="ftrSocialLinks">
        <FacebookFilled
          style={{ fontSize: '20px', color: 'white', marginRight: '3px' }}
        />
        <a
          className="mediaText"
          href="https://www.facebook.com/BridgestoProsperity/"
        >
          - @BridgestoProsperity
        </a>
        <br></br>
        <TwitterOutlined
          style={{
            fontSize: '20px',
            color: 'white',
            marginRight: '-1px',
            marginTop: '3px',
          }}
        />
        <a className="mediaText" href="https://twitter.com/b2p">
          {' '}
          - @B2P
        </a>
        <br></br>
        <InstagramOutlined
          style={{
            fontSize: '20px',
            color: 'white',
            marginRight: '3px',
            marginTop: '3px',
          }}
        />
        <a
          className="mediaText"
          href="https://www.instagram.com/bridgestoprosperity/"
        >
          - @bridgestoprosperity
        </a>
        <br></br>
        <LinkedinFilled
          style={{
            fontSize: '20px',
            color: 'white',
            marginRight: '3px',
            marginTop: '3px',
          }}
        />
        <a
          className="mediaText"
          href="https://www.linkedin.com/company/bridges-to-prosperity"
        >
          - Bridges to Prosperity
        </a>
      </div>
      <div className="ftrInfo">
        <img className="logoFtr" src="B2P_Symbol_White.svg" alt="B2P Logo" />
        <h5 className="address">
          3858 Walnut St., Suite 219 Denver, Colorado 80205 EIN: 54-2031102
        </h5>
        <h6 className="address">
          2018 © Bridges to Prosperity. All rights reserved.
        </h6>
      </div>
    </div>
  );
};

export default B2PFooter;
