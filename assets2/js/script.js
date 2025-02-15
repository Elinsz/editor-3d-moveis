
    let scene, camera, renderer, controls;

    function init() {
    const container = document.getElementById('canvas-container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 5000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(300, 300, 300);
    scene.add(directionalLight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI;

    // Grade plana (opcional)
    const gridHelper = new THREE.GridHelper(1000, 20, 0x888888, 0x444444);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Eixos Absolutos em 3D Personalizados
    drawAxis3D();

    animate();
    }

    function drawAxis3D() {
        const axisLength = 500;

        // Eixo X (Vermelho)
        const xMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const xPoints = [new THREE.Vector3(-axisLength, 0, 0), new THREE.Vector3(axisLength, 0, 0)];
        const xGeometry = new THREE.BufferGeometry().setFromPoints(xPoints);
        const xLine = new THREE.Line(xGeometry, xMaterial);
        scene.add(xLine);

        // Eixo Y (Verde)
        const yMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const yPoints = [new THREE.Vector3(0, -axisLength, 0), new THREE.Vector3(0, axisLength, 0)];
        const yGeometry = new THREE.BufferGeometry().setFromPoints(yPoints);
        const yLine = new THREE.Line(yGeometry, yMaterial);
        scene.add(yLine);

        // Eixo Z (Azul)
        const zMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const zPoints = [new THREE.Vector3(0, 0, -axisLength), new THREE.Vector3(0, 0, axisLength)];
        const zGeometry = new THREE.BufferGeometry().setFromPoints(zPoints);
        const zLine = new THREE.Line(zGeometry, zMaterial);
        scene.add(zLine);

        // Esfera na Origem (0, 0, 0)
        const originGeometry = new THREE.SphereGeometry(10, 16, 16);
        const originMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const originSphere = new THREE.Mesh(originGeometry, originMaterial);
        originSphere.position.set(0, 0, 0);
        scene.add(originSphere);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });

    init();

    document.addEventListener('DOMContentLoaded', () => {
        const dropdownButtons = document.querySelectorAll('.dropdown-btn');

        dropdownButtons.forEach(button => {
            button.addEventListener('click', () => {
                const menu = button.parentElement;
                menu.classList.toggle('active');
            });
        });
    });

    // Dentro da função createModule
    function createModule(width = 200, height = 400, depth = 300) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
        const module = new THREE.Mesh(geometry, material);
        module.position.set(0, height / 2, 0);
        scene.add(module);
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
// function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// }

// animate();

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
