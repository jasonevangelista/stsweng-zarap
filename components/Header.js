import styles from '../styles/header.module.css';
import Image from 'next/image';
import { Typography, Modal } from 'antd';
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
  // const handleOk = () => {
  //   setRegisterModalVisible(true);
  // };

  const handleCancel = () => {
    setRegisterModalVisible(false);
  };

  const redirectToLoginModal = () => {
    setRegisterModalVisible(false);
    // redirect login modal here
  };


  if (router) {
    pathname = router.pathname;
  }

  return (
    <div
      className={`${styles.header} ${
        pathname === '/' ? styles.transparent : ''
      }`}>
      <div className={styles.imageContainer}>
        <Link href="/">
          <Image src="/text.png" width={335} height={81} />
        </Link>
      </div>
      <div className={styles.navLinks}>
          <div>
            <Title level={4} className={`${pathname === '/' ? styles.white :''}`}>Login</Title>
          </div>
          <div className={`${pathname === '/' ? '' : styles.majorButton}`} onClick={()=>{showModal()}}>
            <Title level={4} className={`${pathname === '/' ? styles.white : ''}`}>Sign Up</Title>
          </div>
          <Modal 
            className={styles.registerModal}
            visible={registerModalVisible}
            onCancel={() => {
                handleCancel();
            }}
            footer={null}
            // className={}
            >
            <RegisterModal redirectToLoginModal={redirectToLoginModal}></RegisterModal>

          </Modal>
        </div>
    </div>
  );
}
