import styles from "../styles/404.module.css";
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorHeader}>404</h1>
      <p className={styles.errorMessage}>We can't seem to find the page you're looking for. <Link href="/">Go back home.</Link></p>
    </div>
  );
}