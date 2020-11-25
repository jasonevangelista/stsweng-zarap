import styles from "../styles/header.module.css";
import Image from "next/image";
import { Typography } from "antd";
import { useRouter } from "next/router";
import Link from 'next/link';

const { Title } = Typography;

export default function Header() {
  const router = useRouter();
  const pathname = router.pathname;
  
  return (
    <div className={`${styles.header} ${pathname === '/' ? styles.transparent :''}`}> 
        <div className={styles.imageContainer}>
          <Link href="/">
            <Image src="/text.png" width={335} height={81}/>
          </Link>
        </div>
        {/* <div className={styles.navLinks}>
          <div>
            <Title level={4} className={`${pathname === '/' ? styles.white :''}`}>Login</Title>
          </div>
          <div className={`${pathname === '/' ? '' : styles.majorButton}`}>
            <Title level={4} className={`${pathname === '/' ? styles.white : ''}`}>Sign Up</Title>
          </div>
        </div> */}
    </div>
  );
}
