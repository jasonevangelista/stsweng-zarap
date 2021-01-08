import styles from '../styles/header.module.css';
import Image from 'next/image';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/client';

const { Title } = Typography;

export default function Header() {
  const router = useRouter();
  var pathname = null;

  const [session, loading] = useSession();

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
    // console.log('account registered!');
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
        {!loading && session && (
          <div
            onClick={() => {
              signOut();
            }}>
            <Title
              level={4}
              // className={`${pathname === '/' ? styles.white : ''}`}
              className={[styles.white, styles.login]}>
              Log Out
            </Title>
          </div>
        )}
        {!loading && !session && (
          <>
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
              <Title
                level={4}
                className={[styles.signup, `${pathname === '/' ? styles.white : ''}`]}>
                Sign Up
              </Title>
            </div>

            <LoginModal
              closeModal={closeLoginModal}
              visible={loginModalVisible}
              redirect={redirectToRegisterModal}
            />

            <RegisterModal
              registerModalVisible={registerModalVisible}
              closeModal={closeModal}
              redirectToLoginModal={redirectToLoginModal}
              onFinish={validRegister}
            />
          </>
        )}
      </div>
    </div>
  );
}
