let scene, camera, renderer, controls;
function init() {
  const container = document.getElementById('scene-container');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(200, 200, 200);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xd3d3d3, side: THREE.BackSide });
  const roomGeometry = new THREE.BoxGeometry(500, 500, 500);
  const room = new THREE.Mesh(roomGeometry, roomMaterial);
  scene.add(room);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.screenSpacePanning = true;

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function addBox() {
  const boxGeometry = new THREE.BoxGeometry(50, 50, 50);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(0, 25, 0);
  scene.add(box);
}

function removeBox() {
  if (scene.children.length > 1) scene.remove(scene.children[scene.children.length - 1]);
}

function resetScene() {
  while (scene.children.length > 1) scene.remove(scene.children[scene.children.length - 1]);
}

function toggleDropdown(button) {
  const dropdown = button.parentElement;
  dropdown.classList.toggle('active');
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
