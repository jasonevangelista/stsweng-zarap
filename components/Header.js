import styles from '../styles/header.module.css';
import Image from 'next/image';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import RegisterModal from './RegisterModal';

import React, { useState, useEffect, useRef } from 'react';

const { Title } = Typography;

export default function Header() {
  const router = useRouter();
  var pathname = null;

  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  // modal methods
  const showModal = () => {
    setRegisterModalVisible(true);
  };

  const closeModal = () => {
    setRegisterModalVisible(false);
  };

  const validRegister = () => {
    console.log("account registered!")
    closeModal();
  };

  const redirectToLoginModal = () => {
    closeModal();
    // redirect login modal here
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
        <div>
          <Title level={4} 
          // className={`${pathname === '/' ? styles.white : ''}`}
          className={[styles.white, styles.login]}
          >
            Login
          </Title>
        </div>
        <div
          aria-hidden="true"
          className={`${pathname === '/' ? '' : styles.majorButton}`}
          onClick={() => {
            showModal();
          }}
        >
          <Title level={4} className={[styles.signup, `${pathname === '/' ? styles.white : ''}`]}>
            Sign Up
          </Title>
        </div>
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
