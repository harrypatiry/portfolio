import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector("canvas.webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const rockDis = textureLoader.load('assets/dis.jpg');
const geometry = new THREE.PlaneGeometry(30, 50, 200, 200);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  displacementMap: rockDis,
  displacementScale: 9
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.y = 0;
plane.rotation.x = -11;
plane.rotation.z = 90;
plane.position.y = 5;
plane.position.x = 0;
plane.position.z = 0;
scene.add(plane);

const count = geometry.attributes.position.count;
// const ambLight = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 5;
scene.add( pointLight );

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
  );
  camera.lookAt(0, 0, 0);
  camera.position.z = 4;
  camera.position.y = -3;
  scene.add(camera);
  
  const clock = new THREE.Clock();
  
  new OrbitControls( camera, renderer.domElement );
  window.addEventListener("click", (event) => {
    event.preventDefault();
    plane.material.color = new THREE.Color(0xffffff * Math.random());
    plane.material.needsUpdate = true;
  });
  
  const animate = () => {

    const now = Date.now() / 700;
    for(let i = 0; i < count; i++) {
      const y = (geometry.attributes.position.getY(i)) / 2.5;
      const x = (geometry.attributes.position.getX(i)) / 2.5;
      const ysin = Math.sin(y + now)
      const xsin = Math.sin(x + now)
      geometry.attributes.position.setZ(i, xsin + ysin)
    }
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
    const elapsedTime = clock.getElapsedTime();
    plane.rotation.z = 0.2 * elapsedTime;
    renderer.render(scene, camera);
    
    window.requestAnimationFrame(animate);
  };
  
  animate();