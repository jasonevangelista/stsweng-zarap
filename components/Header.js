import styles from "../styles/header.module.css";
import Image from "next/image";
import { Typography } from "antd";
// import Link from 'next/link';

const { Title } = Typography;

export default function Header({landing}) {
  return (
    <div className={styles.header}>
      {!landing ? (
        <>
          <div className={styles.imageContainer}>
            <Image src="/text.png" width={335} height={81} />
          </div>
          <div className={styles.navLinks}>
            <div>
              <Title level={4}>Login</Title>
            </div>
            <div className={styles.majorButton}>
              <Title level={4}>Sign Up</Title>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.navLinks}>
            <div>
              <Title level={4}>Login</Title>
            </div>
            <div className={styles.majorButton}>
              <Title level={4}>Sign Up</Title>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
