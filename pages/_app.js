import 'antd/dist/antd.css';
import '../styles/global.css';
import Layout from '../components/Layout';
import { Provider } from 'next-auth/client';

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
