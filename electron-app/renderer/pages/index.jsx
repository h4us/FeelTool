import { useState, useEffect } from 'react';

import FaceTracker from '../components/FaceTracker';

export default function IndexPage() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const handleMessage = (event, message) => setMessage(message);
    window.electron.message.on(handleMessage);

    return () => {
      window.electron.message.off(handleMessage);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    window.electron.message.send(input);
    setMessage(null);
  };

  return (
    <>
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
