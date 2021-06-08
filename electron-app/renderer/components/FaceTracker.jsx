import { useState, useEffect, useRef } from 'react';

import { io } from 'socket.io-client';
// import * as serialport from 'serialport';

import { useControls } from 'leva';

import VideoSource from './VideoSource';

import {
  WebGLRenderer,
  PCFSoftShadowMap,
  sRGBEncoding,
  Scene,
  SpotLight,
  PerspectiveCamera,
  HemisphereLight,
  AmbientLight,
  IcosahedronGeometry,
  OrthographicCamera,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
  MeshStandardMaterial,
  ConeGeometry,
  Euler,
} from 'three';

import { FaceMeshFaceGeometry } from "../lib/face.js";

export default function FaceTracker() {
  const canvasRef = useRef();
  const videoSourceRef = useRef(null);

  const isSocketConnectedRef = useRef(false);
  const debugFlagRef = useRef({ checked: false });
  const flipFlagRef = useRef(false);

  const [loadStatus, setLoadStatus] = useState('');
  const [flipFlag, setFlipFlag] = useState(false);

  const flags = useControls({
    'Debug draw': {
      value: false,
      onChange: (v) => {
        if (debugFlagRef.current) {
          debugFlagRef.current.checked = v;
        }
      }
    },

    'Flip': {
      value: false,
      onChange: (v) => {
        flipFlagRef.current = v;
      }
    }
  });

  useEffect(() => {
    let socket = false;
    let frameNum = 0;

    if (window.electron.withSocketIO) {
      socket = io('http://0.0.0.0:9999', {
        path: '/internal-app/socket.io'
      });

      socket.on('connect', () => {
        console.info('connect', socket.id);
        isSocketConnectedRef.current = true;
      });
    }

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas: canvasRef.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.outputEncoding = sRGBEncoding;

    const scene = new Scene();
    const camera = new OrthographicCamera(1, 1, 1, 1, -1000, 1000);
    const debugCamera = new PerspectiveCamera(75, 1, 0.1, 1000);
    debugCamera.position.set(300, 300, 300);
    debugCamera.lookAt(scene.position);

    let width = 0;
    let height = 0;

    resize();
    renderer.render(scene, camera);

    const wireframeMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    const faceGeometry = new FaceMeshFaceGeometry();

    const mask = new Mesh(faceGeometry, wireframeMaterial);
    scene.add(mask);
    mask.receiveShadow = mask.castShadow = true;

    const cngeo = new ConeGeometry(2, 4, 4);
    const cnmat = new MeshBasicMaterial({ color: 0xffff00 });
    const cn = new Mesh(cngeo, cnmat);
    scene.add(cn);

    const spotLight = new SpotLight(0xffffbb, 1);
    spotLight.position.set(0.5, 0.5, 1);
    spotLight.position.multiplyScalar(400);
    scene.add(spotLight);

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 200;
    spotLight.shadow.camera.far = 800;
    spotLight.shadow.camera.fov = 40;
    spotLight.shadow.bias = -0.001125;

    scene.add(spotLight);

    const hemiLight = new HemisphereLight(0xffffbb, 0x080820, 0.25);
    scene.add(hemiLight);

    const ambientLight = new AmbientLight(0x404040, 0.25);
    scene.add(ambientLight);

    const noseMaterial = new MeshStandardMaterial({
      color: 0xff2020,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
    });

    const nose = new Mesh(new IcosahedronGeometry(1, 3), noseMaterial);
    nose.castShadow = nose.receiveShadow = true;
    scene.add(nose);
    nose.scale.setScalar(2);

    window.addEventListener('resize', resize);

    init();

    function resize() {
      const videoAspectRatio = width / height;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowAspectRatio = windowWidth / windowHeight;
      let adjustedWidth;
      let adjustedHeight;

      console.log(videoAspectRatio, windowAspectRatio);

      if (videoAspectRatio > windowAspectRatio) {
        adjustedWidth = windowWidth;
        adjustedHeight = windowWidth / videoAspectRatio;
      } else {
        adjustedWidth = windowHeight * videoAspectRatio;
        adjustedHeight = windowHeight;
      }
      renderer.setSize(adjustedWidth, adjustedHeight);
      debugCamera.aspect = videoAspectRatio;
      debugCamera.updateProjectionMatrix();
    }

    async function render(model) {
      let vsrc = false;

      if (videoSourceRef.current) {
        const [video, webcam] = videoSourceRef.current;
        vsrc = video.src ? (parseInt(video.dataset.loaded) ? video : false) : (parseInt(webcam.dataset.loaded) ? webcam : false);
      }

      if (vsrc) {
        vsrc.style.transform = flipFlagRef.current ? "scaleX(-1)" : "scaleX(1)";

        if (width !== vsrc.videoWidth || height !== vsrc.videoHeight) {
          const w = vsrc.videoWidth;
          const h = vsrc.videoHeight;

          camera.left = -0.5 * w;
          camera.right = 0.5 * w;
          camera.top = 0.5 * h;
          camera.bottom = -0.5 * h;
          camera.updateProjectionMatrix();
          width = w;
          height = h;
          resize();
          faceGeometry.setSize(w, h);
        }
      }

      const faces = vsrc ? await model.estimateFaces(vsrc, false, flipFlagRef.current) : [];

      setLoadStatus('running');

      if (faces.length > 0) {
        faceGeometry.update(faces[0], flipFlagRef.current);

        const track = faceGeometry.track(5, 45, 275);
        nose.position.copy(track.position);
        nose.rotation.setFromRotationMatrix(track.rotation);

        cn.position.copy(track.position);
        cn.rotation.setFromRotationMatrix(track.rotation);

        const e = new Euler();
        e.setFromRotationMatrix(track.rotation);
        // let dx = (e.x - (Math.PI)) * 180 / Math.PI;
        // dx = (dx < 0) ? dx + 360 : dx;
        let dy = Math.sin(e.x - Math.PI) * 30;
        let angle = (e.y + (Math.PI / 2)) * 180 / Math.PI;
        angle = (angle < 0) ? angle + 360 : angle;

        if (frameNum % 15 == 0) {
          // console.log('tick', angle, Math.min(dy * 2 + Math.max(track.position.y, 0), 180));
          if (isSocketConnectedRef.current) {
            socket.emit('tracking', angle, 0, Math.min(dy * 2 + Math.max(track.position.y + 20, 30), 180));
          }

          window.electron.sendTrackingData([
            angle, 0, Math.min(dy * 2 + Math.max(track.position.y + 20, 30), 180)
          ]);
        }
      }

      if (debugFlagRef.current && debugFlagRef.current.checked) {
        renderer.render(scene, camera);
      } else {
        renderer.autoClear = false;
        renderer.clear(false, true, false);
        renderer.autoClear = true;
      }

      frameNum++;
      requestAnimationFrame(() => render(model));
    }

    async function init() {
      setTimeout(() => {
        (async () => {
          await Promise.all([tf.setBackend('webgl')]);
          setLoadStatus('Loading model...');
          const model = await facemesh.load({ maxFaces: 1 });
          setLoadStatus('Detecting face...');

          // let isGrip = 0;
          // let isPause = 0;

          // document.querySelector('#grip').addEventListener('click', () => {
          //   isGrip = (isGrip + 1) % 2;
          //   console.log('grab?', isGrip);
          //   socket.emit('attachment', 'grip', isGrip);
          // });

          // document.querySelector('#pause').addEventListener('click', () => {
          //   isPause = (isPause + 1) % 2;
          //   if (isPause) {
          //     av.video.pause();
          //   } else {
          //     av.video.play();
          //   }
          // });

          render(model);
        })();
      }, 2000);
    }

    return () => window.addEventListener('resize', resize);
  }, []);

  return (
    <>
      <div id="container">
        <div style={{
          display: 'flex', alignItems:'center', justifyContent: 'center',
          position: 'absolute', left:  0, right: 0, top: 0, bottom: 0,
          overflow: 'hidden'
        }}>
          <VideoSource ref={videoSourceRef}/>
        </div>
        <canvas id="canvas" ref={canvasRef}></canvas>
      </div>

      <div style={{
        position:'fixed', top: 0, left:0,
        padding:'0.25rem', maxWidth: '250px',
        background: 'rgba(255,255,255,.8)', fontSize:'0.8rem'
      }}>
        <p>socket.io status: {isSocketConnectedRef.current ? 'connected' : '--'}</p>
        <p>model status: {loadStatus}</p>
      </div>
    </>
  );
};
