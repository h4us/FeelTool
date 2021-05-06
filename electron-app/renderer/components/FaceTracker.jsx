import { useState, useEffect, useRef } from 'react';

import { io } from 'socket.io-client';
// import * as serialport from 'serialport';

import gumAV from '../lib/gum-av';

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
import { OrbitControls } from "../lib/OrbitControls.js";

export default function FaceTracker() {
  const isSocketConnectedRef = useRef(false);
  const [loadStatus, setLoadStatus] = useState('');


  const openSerialPort = async () => {
    // const pl = await serialport.list();
    // console.log(pl);
    const res = await window.electron.ipcRenderer.invoke('serialport', 100);
    console.log(res);
  };

  useEffect(() => {
    gumAV();

    // 1.
    const socket = io('http://0.0.0.0:9999', {
      path: '/internal-app/socket.io'
    });
    let frameNum = 0;

    socket.on('connect', () => {
      console.info('connect', socket.id);
      isSocketConnectedRef.current = true;
    });

    const av = document.querySelector("gum-av");
    const canvas = document.querySelector("canvas");
    const status = document.querySelector("#status");

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas });
    // renderer.setClearColor(0x202020);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.outputEncoding = sRGBEncoding;

    const scene = new Scene();
    const camera = new OrthographicCamera(1, 1, 1, 1, -1000, 1000);
    const debugCamera = new PerspectiveCamera(75, 1, 0.1, 1000);
    debugCamera.position.set(300, 300, 300);
    debugCamera.lookAt(scene.position);
    const controls = new OrbitControls(debugCamera, renderer.domElement);

    let width = 0;
    let height = 0;

    function resize() {
      const videoAspectRatio = width / height;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowAspectRatio = windowWidth / windowHeight;
      let adjustedWidth;
      let adjustedHeight;
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

    window.addEventListener('resize', () => {
      resize();
    });

    resize();
    renderer.render(scene, camera);

    // 2.
    const colorTexture = new TextureLoader().load('mesh_map.jpg');
    const aoTexture = new TextureLoader().load('ao.jpg');
    const alphaTexture = new TextureLoader().load('mask.png');

    const wireframeMaterial = new MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
    });

    const material = new MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.8,
      metalness: 0.1,
      alphaMap: alphaTexture,
      aoMap: aoTexture,
      map: colorTexture,
      roughnessMap: colorTexture,
      transparent: true,
      side: DoubleSide,
    });

    const faceGeometry = new FaceMeshFaceGeometry();

    const mask = new Mesh(faceGeometry, material);
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
      color: 0xff2010,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
    });

    const nose = new Mesh(new IcosahedronGeometry(1, 3), noseMaterial);
    nose.castShadow = nose.receiveShadow = true;
    scene.add(nose);
    nose.scale.setScalar(2);

    let wireframe = false;
    let flipCamera = true;

    async function render(model) {
      await av.ready();

      av.video.style.transform = flipCamera ? "scaleX(-1)" : "scaleX(1)";

      if (width !== av.video.videoWidth || height !== av.video.videoHeight) {
        const w = av.video.videoWidth;
        const h = av.video.videoHeight;
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

      const faces = await model.estimateFaces(av.video, false, flipCamera);

      av.style.opacity = 1;
      setLoadStatus("--");

      if (faces.length > 0) {
        faceGeometry.update(faces[0], flipCamera);

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

        if (frameNum % 30 == 0) {
          console.log('tick', angle, Math.min(dy * 2 + Math.max(track.position.y, 0), 180));
          if (isSocketConnectedRef.current) {

            // --
            socket.emit('tracking', angle, 0, Math.min(dy * 2 + Math.max(track.position.y + 20, 30), 180));
            window.electron.ipcRenderer.send(
              'tracking',
              [angle, 0, Math.min(dy * 2 + Math.max(track.position.y + 20, 30), 180)]
            );
            // --
          }
        }
      }

      if (wireframe) {
        renderer.render(scene, camera);
        renderer.autoClear = false;
        renderer.clear(false, true, false);

        mask.material = wireframeMaterial;
        renderer.render(scene, camera);
        mask.material = material;

        renderer.autoClear = true;
      } else {
        // Render the scene normally.
        renderer.render(scene, camera);
      }

      frameNum++;
      requestAnimationFrame(() => render(model));
    }

    async function init() {
      console.log('post init');

      setTimeout(() => {
        (async () => {
          await Promise.all([tf.setBackend("webgl"), av.ready()]);
          setLoadStatus("Loading model...");
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

      console.log('init done');
    }

    init();
  }, []);

  return (
    <>
      <div id="container">
        <gum-av></gum-av>
        {/* <div style="width:100vw; height:100vh"> */}
        {/*   <video id="recorded" autoplay muted loop style="margin:0 auto; display:block; height:100%;"> */}
        {/*     <source src="/app/test.webm" /> */}
        {/*   </video> */}
        {/* </div> */}
        <canvas id="canvas"></canvas>
      </div>

      <div style={{position:'fixed', top: 0, left:0, background: 'rgba(255,255,255,.8)', padding:'0.25rem', fontSize:'0.8rem'}}>
        <p>socket.io status: {isSocketConnectedRef.current ? 'connected!' : '--'}</p>
        <p>model status: {loadStatus}</p>
        <div>
          <button onClick={() => openSerialPort()}>open serial port</button>
        </div>
      </div>
    </>
  );
};
