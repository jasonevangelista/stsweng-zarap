import styles from '../styles/header.module.css';
import Image from 'next/image';
import { Typography, Input } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import RegisterModal from './RegisterModal';

import React, { useState, useEffect, useRef } from 'react';

const { Title } = Typography;
const { Search } = Input;

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
    console.log('account registered!');
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
      <Link href="/">
        <div className={styles.imageContainer}>
          <Image src="/text.png" width={130} height={35} />
        </div>
      </Link>

      {/* search bar for specific pages */}
      {router && router.pathname.includes('/restaurant/') ? (
        <Search
          placeholder="Search for restaurants"
          allowClear
          className={[styles.searchBar, 'searchBar']}
          onSearch={(value) => (value ? router.push(`/searchfilter/${value}`) : '')}
        />
      ) : (
        ''
      )}

      {/* login logout and register */}
      <div className={styles.navLinks}>
        <div>
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
