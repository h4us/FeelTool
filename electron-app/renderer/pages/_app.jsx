import { useEffect } from 'react';

// import { useRouter } from 'next/router';
import Head from 'next/head';

import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
