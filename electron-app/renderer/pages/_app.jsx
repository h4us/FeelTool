import { useEffect } from 'react';

// import { useRouter } from 'next/router';
import Head from 'next/head';

import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
  }, []);

  return (
    <>
      <Head>
        <script src="https://unpkg.com/@tensorflow/tfjs-core@2.7.0/dist/tf-core.js"></script>
        <script src="https://unpkg.com/@tensorflow/tfjs-converter@2.7.0/dist/tf-converter.js"></script>

        <script src="https://unpkg.com/@tensorflow/tfjs-backend-cpu@2.7.0/dist/tf-backend-cpu.js"></script>
        <script src="https://unpkg.com/@tensorflow/tfjs-backend-wasm@2.7.0/dist/tf-backend-wasm.js"></script>
        <script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.7.0/dist/tf-backend-webgl.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/facemesh"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
