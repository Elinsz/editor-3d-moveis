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
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const depth = parseFloat(document.getElementById('depth').value);

    if (selectedModule) {
        selectedModule.scale.set(width / 200, height / 400, depth / 300);
    }
}

function applyMaterials() {
    const lateral = document.getElementById('material-lateral').value;
    const base = document.getElementById('material-base').value;
    const fundo = document.getElementById('material-fundo').value;
    alert(`Materiais Aplicados:\nLateral: ${lateral}\nBase: ${base}\nFundo: ${fundo}`);
}

addEnvironment();

let selectedModule = null;

// EXEMPLO DE MÓDULO (caixa)
function createModule(width = 200, height = 400, depth = 300, color = 0x00ff00) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color });
    const module = new THREE.Mesh(geometry, material);
    module.position.y = height / 2;
    module.userData.draggable = true;

    module.addEventListener('click', () => {
        selectedModule = module;
    });

    scene.add(module);
}

createModule();

// Painel lateral com lista de componentes salvos
const savedComponentsPanel = document.createElement('div');
savedComponentsPanel.id = 'saved-components-panel';
savedComponentsPanel.style.position = 'absolute';
savedComponentsPanel.style.top = '0';
savedComponentsPanel.style.left = '0';
savedComponentsPanel.style.width = '250px';
savedComponentsPanel.style.height = '100vh';
savedComponentsPanel.style.backgroundColor = '#f0f0f0';
savedComponentsPanel.style.overflowY = 'auto';
savedComponentsPanel.style.padding = '10px';
document.body.appendChild(savedComponentsPanel);

function loadSavedComponents() {
    const componentsData = [
        { id: 1, name: 'Caixa Alta', width: 300, height: 600, depth: 400, color: 0xff0000 },
        { id: 2, name: 'Caixa Baixa', width: 500, height: 300, depth: 500, color: 0x00ff00 }
    ];

    savedComponentsPanel.innerHTML = '<h3>Componentes Salvos</h3>';

    componentsData.forEach(component => {
        const componentItem = document.createElement('div');
        componentItem.style.border = '1px solid #ccc';
        componentItem.style.margin = '5px 0';
        componentItem.style.padding = '10px';
        componentItem.style.cursor = 'pointer';
        componentItem.textContent = component.name;
        componentItem.addEventListener('click', () => {
            createModule(component.width, component.height, component.depth, component.color);
        });
        savedComponentsPanel.appendChild(componentItem);
    });
}

loadSavedComponents();

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
