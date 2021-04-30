const {
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
} = THREE;

import { FaceMeshFaceGeometry } from "../../js/face.js";
import { OrbitControls } from "../../third_party/OrbitControls.js";

const socket = io('http://localhost:8080', {
  path: '/app/socket.io'
});
let isSocketConnected = false;
let frameNum = 0;

socket.on('connect', () => {
  console.info('connect', socket.id);
  isSocketConnected = true;
});

const av = document.querySelector("gum-av");
// document.querySelector('#recorded').onloadeddata = () => {
//   console.log('loaded!');
// };

// const av = {
//   async ready() {
//     return new Promise((resolve) => {
//       // document.querySelector('#recorded').onloadeddata = () => {
//       //   console.log('loaded!');
//       resolve();
//       // };
//     });
//   },
//   style: {
//     opacity: 0
//   },
//   video: document.querySelector('#recorded')
// };

const canvas = document.querySelector("canvas");
const status = document.querySelector("#status");

// Set a background color, or change alpha to false for a solid canvas.
const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas });
// renderer.setClearColor(0x202020);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.outputEncoding = sRGBEncoding;

const scene = new Scene();
const camera = new OrthographicCamera(1, 1, 1, 1, -1000, 1000);

// Change to renderer.render(scene, debugCamera); for interactive view.
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

window.addEventListener("resize", () => {
  resize();
});
resize();
renderer.render(scene, camera);

// Load textures for mask material.
const colorTexture = new TextureLoader().load("../../assets/mesh_map.jpg");
const aoTexture = new TextureLoader().load("../../assets/ao.jpg");
const alphaTexture = new TextureLoader().load("../../assets/mask.png");

// Create wireframe material for debugging.
const wireframeMaterial = new MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true,
});

// Create material for mask.
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

// Create a new geometry helper.
const faceGeometry = new FaceMeshFaceGeometry();

// Create mask mesh.
const mask = new Mesh(faceGeometry, material);
scene.add(mask);
mask.receiveShadow = mask.castShadow = true;

const cngeo = new ConeGeometry(2, 4, 4);
const cnmat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cn = new Mesh(cngeo, cnmat);
scene.add(cn);

// Add lights.
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

// Create a red material for the nose.
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

// Enable wireframe to debug the mesh on top of the material.
let wireframe = false;

// Defines if the source should be flipped horizontally.
let flipCamera = true;

async function render(model) {
  // Wait for video to be ready (loadeddata).
  await av.ready();

  // Flip video element horizontally if necessary.
  av.video.style.transform = flipCamera ? "scaleX(-1)" : "scaleX(1)";

  // Resize orthographic camera to video dimensions if necessary.
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

  // Wait for the model to return a face.
  const faces = await model.estimateFaces(av.video, false, flipCamera);

  av.style.opacity = 1;
  status.textContent = "";

  // There's at least one face.
  if (faces.length > 0) {
    // Update face mesh geometry with new data.
    faceGeometry.update(faces[0], flipCamera);

    // Modify nose position and orientation.
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

    if (frameNum % 15 == 0 && isSocketConnected) {
      console.log('tick', angle, Math.min(dy * 2 + Math.max(track.position.y, 0), 180));
      socket.emit('tracking', angle, 0, Math.min(dy * 2 + Math.max(track.position.y + 20, 30), 180));
    }
  }

  if (wireframe) {
    // Render the mask.
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

// Init the demo, loading dependencies.
async function init() {
  await Promise.all([tf.setBackend("webgl"), av.ready()]);
  status.textContent = "Loading model...";
  const model = await facemesh.load({ maxFaces: 1 });
  status.textContent = "Detecting face...";

  //
  let isGrip = 0;
  let isPause = 0;

  document.querySelector('#grip').addEventListener('click', () => {
    isGrip = (isGrip + 1) % 2;
    console.log('grab?', isGrip);
    socket.emit('attachment', 'grip', isGrip);
  });

  document.querySelector('#pause').addEventListener('click', () => {
    isPause = (isPause + 1) % 2;
    if(isPause) {
      av.video.pause();
    } else {
      av.video.play();
    }
  });

  //
  render(model);
}

init();
