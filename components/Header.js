import styles from '../styles/header.module.css';
import Image from 'next/image';
import { Typography, Input } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/client';

const { Title } = Typography;
const { Search } = Input;

export default function Header() {
  const router = useRouter();
  let pathname = null;

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
      <Link href="/">
        <div className={styles.imageContainer}>
          <Image src="/text.png" width={130} height={35} />
        </div>
      </Link>

      {/* search bar for specific pages */}
      {router && (router.pathname.includes('/restaurant/') || router.pathname.includes('/user/')) ? (
        <Search
          id="searchbar"
          placeholder="Search for restaurants"
          allowClear
          className={[styles.searchBar, 'searchBar']}
          onSearch={(value) => {
            if(value){
              const encodedValue = encodeURIComponent(value)
              // console.log("encoded: " + encodedValue)
              // router.push('searchfilter/' + encodedValue);
              router.push(`/searchfilter/${encodedValue}`)
            }
          }}
        />
      ) : (
        ''
      )}

      {/* login logout and register */}
      <div className={styles.navLinks}>
        {!loading && session && (
          <>
            <div
              aria-hidden="true"
              // className={`${pathname === '/' ? '' : styles.majorButton}`}
              onClick={() => {
                router.push("/user/" + session.user.id);
              }}>
              <Title
                level={4}
                // className={[styles.signup, `${pathname === '/' ? styles.white : ''}`]}>
                className={[styles.signup, styles.white]}>
                My Profile
              </Title>
            </div>
            <div
              aria-hidden="true"
              onClick={() => {
                signOut({ callbackUrl: '/' });
              }}>
              <Title
                level={4}
                // className={`${pathname === '/' ? styles.white : ''}`}
                className={[styles.white, styles.login]}>
                Log Out
              </Title>
            </div>
          </>
        )}
        {!loading && !session && (
          <>
            <div
              id="login"
              aria-hidden="true"
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
              id="signup"
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
