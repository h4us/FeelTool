import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import FaceTracker from '../components/FaceTracker';
import VideoSource from '../components/VideoSource';

export default function IndexPage() {
  const [dropPane, setDropPane] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPane(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPane(false);
  };

  const handleDrop = useCallback((e) => { console.log(e); }, []);

  useEffect(() => {
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

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

      <VideoSource />
      <FaceTracker />

      <div
        className={ !dropPane ? 'drop-pane' : 'drop-pane ready' }
        onDrop={handleDrop}>
        <h3>Drop Video File Here</h3>
      </div>
    </>
  );
}
