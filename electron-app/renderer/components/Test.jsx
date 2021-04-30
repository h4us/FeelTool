import { useState, useEffect } from 'react';

import { io } from 'socket.io-client';

export default function Test() {
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    window.fetch('http://0.0.0.0:9999/hello')
      .then(res => res.json())
      .then(data => console.log(data));

    const socket = io('http://0.0.0.0:9999', {
      path: '/internal-app/socket.io'
    });
    // let isSocketConnected = false;
    // let frameNum = 0;

    socket.on('connect', () => {
      console.info('connect', socket.id);
      setIsSocketConnected(true);
    });
  }, []);

  return (
    <h2>socket.io status: {isSocketConnected ? 'connected!' : '--' }</h2>
  );
};
