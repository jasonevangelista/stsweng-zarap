import styles from '../styles/footer.module.css';
import { FacebookFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  var pathname = null;
  if (router) {
    pathname = router.pathname;
  }

  return (
    <footer className={`${styles.footer} ${
      pathname === '/' ? styles.landing : ''
    }`}>
      <p>© 2020 TeamPura. All Rights Reserved</p>
      <p>
                Contact us through
        {'   '}
        <a
          href="https://www.messenger.com/"
          target="_blank"
          rel="noreferrer noopener">
          <FacebookFilled />
        </a>
        {'   '}
                TeamPura Tech Solutions Ltd.:
        {'   '}
        <span style={{ textDecoration: 'underline' }}>zarap@gmail.com</span>
      </p>
    </footer>
  );
}
