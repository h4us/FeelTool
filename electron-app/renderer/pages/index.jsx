import { useState, useEffect } from 'react';

import Head from 'next/head';

import FaceTracker from '../components/FaceTracker';

export default function IndexPage() {
  // const [input, setInput] = useState('');
  const [message, setMessage] = useState(null);

  // useEffect(() => {
  //   const handleMessage = (event, message) => setMessage(message);
  //   window.electron.message.on(handleMessage);

  //   return () => {
  //     window.electron.message.off(handleMessage);
  //   };
  // }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   window.electron.message.send(input);
  //   setMessage(null);
  // };

  return (
    <>
      <Head>
        <script src="./tf-core.js"></script>
        <script src="./tf-converter.js"></script>

        <script src="./tf-backend-cpu.js"></script>
        <script src="./tf-backend-wasm.js"></script>
        <script src="./tf-backend-webgl.js"></script>

        <script src="./facemesh"></script>
      </Head>

      {message && <p>{message}</p>}

      <FaceTracker />

      {/* <form onSubmit={handleSubmit}> */}
      {/*   <input */}
      {/*     type="text" */}
      {/*     value={input} */}
      {/*     onChange={(e) => setInput(e.target.value)} */}
      {/*   /> */}
      {/* </form> */}
    </>
  );
}
