import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import FaceTracker from '../components/FaceTracker';

export default function IndexPage() {
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

      <FaceTracker />
    </>
  );
}
