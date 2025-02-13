// CENA E CÂMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 300, 500);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// CONTROLES DE CÂMERA
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Ambiente 3D (paredes, piso e teto) - Ajustado com cor clara
function addEnvironment() {
    const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5f5, side: THREE.BackSide });

    const roomGeometry = new THREE.BoxGeometry(1000, 500, 1000);
    const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
    roomMesh.position.y = 250;
    scene.add(roomMesh);
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
