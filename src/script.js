import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SphereBufferGeometry } from "three";
import dat from "dat.gui";
/*Scene*/
const scene = new THREE.Scene();
/*Axis Helper*/
// const axisHelper = new THREE.AxisHelper();
// scene.add(axisHelper);

/*DatGui*/
const gui = new dat.GUI();
/*Canvas*/
const canvas = document.querySelector("canvas.webgl");

/*Fog*/
const fog = new THREE.Fog("#262837", 1, 15);
// gui.add(fog, "near").min(1).max(100).step(1);
// gui.add(fog, "far").min(1).max(100).step(1);
scene.fog = fog;

/*Textures*/
const textureLoader = new THREE.TextureLoader();
/*Door*/
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
/*Bricks*/
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);
/*Grass*/
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);
/*Repeat per allagare le texture*/
grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
/*End Textures*/

/*Meshes*/
/*Plane*/
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    transparent: true,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
plane.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
plane.rotation.x = -(Math.PI / 2);
plane.receiveShadow = true;
scene.add(plane);

/*House*/
const house = new THREE.Group();
scene.add(house);
/*House Walls*/
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.2, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.castShadow = true;
walls.position.y = 2.2 / 2;
house.add(walls);
/*House Roof*/
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.2, 1, 4, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 2.2 + 1 / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);
/*House Door*/
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1.5, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1.8 / 2;
door.position.z = 2 + 0.001;
house.add(door);

/*Bushes*/
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });
const bush1 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.6, 32, 16),
  bushMaterial
);
bush1.position.set(1, 0.2, 3.2);
bush1.castShadow = true;

scene.add(bush1);
const bush2 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 32, 16),
  bushMaterial
);
bush2.position.set(-0.7, 0.2, 2.9);
bush2.castShadow = true;

scene.add(bush2);
const bush3 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3, 32, 16),
  bushMaterial
);
bush3.position.set(1.7, 0.2, 2.5);
bush3.castShadow = true;
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
  grave.castShadow = true;
  graves.add(grave);
}
/*End Meshes*/

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
const pointLight = new THREE.PointLight("#ff7d46", 2, 7);
pointLight.position.set(0, 2, 2);
pointLight.castShadow = true;
house.add(pointLight);
/*Ghost lights*/
const ghostLight1 = new THREE.PointLight("#ff00ff", 2, 3);
ghostLight1.castShadow = true;

scene.add(ghostLight1);
const ghostLight2 = new THREE.PointLight("#00ffff", 2, 3);
ghostLight2.castShadow = true;
scene.add(ghostLight2);

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
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);

/*Animation*/
const clock = new THREE.Clock();
const tick = () => {
  //Ghosts animation
  const elapsedTime = clock.getElapsedTime();
  const ghostAngle1 = elapsedTime * 0.4;
  const ghostAngle2 = elapsedTime * 0.2;

  ghostLight1.position.x = Math.cos(ghostAngle1) * 5;
  ghostLight1.position.z = Math.sin(ghostAngle1) * 5;
  ghostLight1.position.y = Math.sin(ghostAngle1) * 3;
  ghostLight2.position.x = Math.cos(ghostAngle2) * 7;
  ghostLight2.position.z = Math.sin(ghostAngle2) * 7;
  ghostLight2.position.y = Math.sin(ghostAngle2) * 3;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
