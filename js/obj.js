import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerHeight, window.innerWidth);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const rockDis = textureLoader.load('assets/dis.jpg');
const geometry = new THREE.PlaneGeometry(50, 50, 100, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  displacementMap: rockDis,
  displacementScale: 11
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.y = 0;
plane.rotation.x = -11;
plane.rotation.z = 90;
plane.position.y = 15;
plane.position.x = 0;
plane.position.z = 10;
plane.scale.set(2,2,2)
scene.add(plane);

const count = geometry.attributes.position.count;
// const ambLight = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 0;
pointLight.position.y = -1;
pointLight.position.z = 5;
scene.add( pointLight );

window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    
    }


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
  );
  camera.lookAt(0, 0, 0);
  camera.position.z = 15;
  camera.position.y = -4;
  camera.rotation.x = 6.9;
  scene.add(camera);
  
  const clock = new THREE.Clock();
  
  // new OrbitControls( camera, renderer.domElement );

  const animate = () => {

    const now = Date.now() / 700;
    for(let i = 0; i < count; i++) {
      const y = (geometry.attributes.position.getY(i)) / 3;
      const x = (geometry.attributes.position.getX(i)) / 3;
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