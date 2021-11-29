import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SphereBufferGeometry } from "three";

/*Scene*/
const scene = new THREE.Scene();
/*Axis Helper*/
const axisHelper = new THREE.AxisHelper();
scene.add(axisHelper);
/*Canvas*/
const canvas = document.querySelector("canvas.webgl");

/*Meshes*/
/*Plane*/
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "gray" })
);
plane.rotation.x = -(Math.PI / 2);
scene.add(plane);

/*House*/
const house = new THREE.Group();
scene.add(house);
/*House Walls*/
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.7, 4),
  new THREE.MeshStandardMaterial({ color: "brown" })
);
walls.position.y = 2.7 / 2;
house.add(walls);
/*House Roof*/
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4, 4),
  new THREE.MeshStandardMaterial({ color: "orange" })
);
roof.position.y = 2.7 + 1 / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);
/*House Door*/
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1.3, 1.8),
  new THREE.MeshStandardMaterial({ color: "blue" })
);
door.position.y = 1.8 / 2;
door.position.z = 2 + 0.001;
house.add(door);

/*Bushes*/
const bushMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const bush1 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.6, 32, 16),
  bushMaterial
);
bush1.position.set(1, 0.2, 3.2);
scene.add(bush1);
const bush2 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 32, 16),
  bushMaterial
);
bush2.position.set(-0.7, 0.2, 2.9);
scene.add(bush2);
const bush3 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3, 32, 16),
  bushMaterial
);
bush3.position.set(1.7, 0.2, 2.5);
scene.add(bush3);
/*Sizes*/
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/*Camera*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 9;
camera.position.y = 1;
scene.add(camera);

/*Lights*/
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
scene.add(directionalLightHelper);
directionalLightHelper.visible = false;

/*Controls*/
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*Resize*/
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/*Renderer*/
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

/*Animation*/
const clock = new THREE.Clock();
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
