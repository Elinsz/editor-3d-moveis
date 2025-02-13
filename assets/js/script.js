// CENA E CÂMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 300, 500);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 250, window.innerHeight);
renderer.setClearColor(0xf0f0f0);
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

addEnvironment();

// Função para aplicar as dimensões ao módulo
function applyDimensions() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const depth = parseFloat(document.getElementById('depth').value);

    if (selectedModule) {
        selectedModule.scale.set(width / 200, height / 400, depth / 300);
    }
}

// Função para aplicar os materiais
function applyMaterials() {
    const lateral = document.getElementById('material-lateral').value;
    const base = document.getElementById('material-base').value;
    const fundo = document.getElementById('material-fundo').value;
    alert(`Materiais Aplicados:\nLateral: ${lateral}\nBase: ${base}\nFundo: ${fundo}`);
}

// Variáveis de controle dos módulos
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

// Função para adicionar um componente salvo
function addSavedComponent(componentName, width, height, depth, color) {
    const savedComponentsPanel = document.getElementById('saved-components');

    const componentButton = document.createElement('button');
    componentButton.textContent = componentName;
    componentButton.onclick = function() {
        createModule(width, height, depth, color);  // Cria o módulo com as dimensões e cor definidas
    };

    savedComponentsPanel.appendChild(componentButton);
}

// Função para carregar os componentes salvos
function loadSavedComponents() {
    const componentsData = [
        { id: 1, name: 'Caixa Alta', width: 300, height: 600, depth: 400, color: 0xff0000 },
        { id: 2, name: 'Caixa Baixa', width: 500, height: 300, depth: 500, color: 0x00ff00 }
    ];

    const savedComponentsPanel = document.getElementById('saved-components');
    savedComponentsPanel.innerHTML = ''; // Limpa o conteúdo anterior

    componentsData.forEach(component => {
        addSavedComponent(component.name, component.width, component.height, component.depth, component.color);
    });
}

// Carrega os componentes salvos
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
    camera.aspect = (window.innerWidth - 250) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - 250, window.innerHeight);
});
