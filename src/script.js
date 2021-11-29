import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SphereBufferGeometry } from "three";
import dat from "dat.gui";
/*Scene*/
const scene = new THREE.Scene();
/*Axis Helper*/
const axisHelper = new THREE.AxisHelper();
scene.add(axisHelper);
/*DatGui*/
const gui = new dat.GUI();
/*Canvas*/
const canvas = document.querySelector("canvas.webgl");
/*Fog*/
const fog = new THREE.Fog("#262837", 1, 15);
gui.add(fog, "near").min(1).max(100).step(1);
gui.add(fog, "far").min(1).max(100).step(1);
scene.fog = fog;
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

/*Graves*/
const graves = new THREE.Group();
scene.add(graves);
const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });
/*50 Graves*/
for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 6;
  const z = Math.cos(angle) * radius;
  const x = Math.sin(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.2, z);
  grave.rotation.z = Math.random() * 0.2;
  grave.rotation.y = Math.random() * 0.2;

  graves.add(grave);
}
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
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
scene.add(directionalLightHelper);
directionalLightHelper.visible = false;
const pointLight = new THREE.PointLight("#ff7d46", 1, 7);
pointLight.position.set(0, 1.8 / 2, 2);
house.add(pointLight);

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
renderer.setClearColor("#262837");
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
