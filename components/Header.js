import styles from '../styles/header.module.css';
import Image from 'next/image';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

import React, { useState, useEffect, useRef } from 'react';

/* middleware */
import { absoluteUrl, getAppCookies, verifyToken, setLogout } from '../lib/utils';

const { Title } = Typography;

export default function Header(props) {
  const { profile } = props;
  const router = useRouter();
  var pathname = null;

  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  // modal methods
  const showModal = () => {
    setRegisterModalVisible(true);
  };

  const closeModal = () => {
    setRegisterModalVisible(false);
  };

  const validRegister = () => {
    console.log('account registered!');
    closeModal();
  };

  const redirectToLoginModal = () => {
    closeModal();
    showLoginModal();
  };

  // For login modal
  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const redirectToRegisterModal = () => {
    closeLoginModal();
    showModal();
  };

  if (router) {
    pathname = router.pathname;
  }

  return (
    <div className={`${styles.header} ${pathname === '/' ? styles.transparent : ''}`}>
      <div className={styles.imageContainer}>
        <Link href="/">
          <Image src="/text.png" width={130} height={35} />
        </Link>
      </div>
      <div className={styles.navLinks}>
        <div
          onClick={() => {
            showLoginModal();
          }}>
          <Title
            level={4}
            // className={`${pathname === '/' ? styles.white : ''}`}
            className={[styles.white, styles.login]}>
            Login
          </Title>
        </div>
        <div
          aria-hidden="true"
          className={`${pathname === '/' ? '' : styles.majorButton}`}
          onClick={() => {
            showModal();
          }}>
          <Title level={4} className={[styles.signup, `${pathname === '/' ? styles.white : ''}`]}>
            Sign Up
          </Title>
        </div>
        {!profile ? (
          <LoginModal
            closeModal={closeLoginModal}
            visible={loginModalVisible}
            redirect={redirectToRegisterModal}
          />
        ) : (
          <h1>Log Out</h1>
        )}

        <RegisterModal
          registerModalVisible={registerModalVisible}
          closeModal={closeModal}
          redirectToLoginModal={redirectToLoginModal}
          onFinish={validRegister}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';

  return {
    props: {
      baseApiUrl,
      profile
    }
  };
}
