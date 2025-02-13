// CENA E CÂMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 300, 500);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0); // Fundo claro para remover o preto

document.getElementById('canvas-container').appendChild(renderer.domElement);

// CONTROLES DE CÂMERA
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Ambiente 3D (paredes, piso e teto) com tons claros
function addEnvironment() {
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, side: THREE.DoubleSide });
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xd6d6d6 });
    const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0xeaeaea });

    // Piso
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Teto
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 500;
    scene.add(ceiling);

    // Paredes
    const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(1000, 500), wallMaterial);
    wallBack.position.z = -500;
    wallBack.position.y = 250;
    scene.add(wallBack);

    const wallFront = new THREE.Mesh(new THREE.PlaneGeometry(1000, 500), wallMaterial);
    wallFront.position.z = 500;
    wallFront.position.y = 250;
    wallFront.rotation.y = Math.PI;
    scene.add(wallFront);

    const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(1000, 500), wallMaterial);
    wallLeft.position.x = -500;
    wallLeft.position.y = 250;
    wallLeft.rotation.y = Math.PI / 2;
    scene.add(wallLeft);

    const wallRight = new THREE.Mesh(new THREE.PlaneGeometry(1000, 500), wallMaterial);
    wallRight.position.x = 500;
    wallRight.position.y = 250;
    wallRight.rotation.y = -Math.PI / 2;
    scene.add(wallRight);
}

function applyDimensions() {
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const depth = document.getElementById('depth').value;
    alert(`Dimensões Aplicadas: Largura ${width}mm, Altura ${height}mm, Profundidade ${depth}mm`);
}

function applyMaterials() {
    const lateral = document.getElementById('material-lateral').value;
    const base = document.getElementById('material-base').value;
    const fundo = document.getElementById('material-fundo').value;
    alert(`Materiais Aplicados:\nLateral: ${lateral}\nBase: ${base}\nFundo: ${fundo}`);
}

addEnvironment();

// EXEMPLO DE MÓDULO (caixa)
function createModule() {
    const geometry = new THREE.BoxGeometry(200, 400, 300);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const module = new THREE.Mesh(geometry, material);
    module.position.y = 200;
    scene.add(module);
}

createModule();

// ANIMAÇÃO DA CENA
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// FUNÇÕES DE BOTÕES
function addModule() {
    createModule();
}

function saveModules() {
    alert('Módulos salvos (simulado)');
}

function loadModules() {
    alert('Módulos carregados (simulado)');
}

// CONTROLE DOS DROPDOWNS
document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', function () {
        const menu = this.parentElement;
        menu.classList.toggle('active');
    });
});

// Ajusta a tela em caso de redimensionamento
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
