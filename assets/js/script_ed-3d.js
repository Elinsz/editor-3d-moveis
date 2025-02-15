document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("canvas-container");
    const scene = new THREE.Scene();

    // Configurar câmera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 20000);
    camera.position.set(500, 500, 500);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Grade infinita
    const gridHelper = new THREE.GridHelper(10000, 500, 0x888888, 0x444444);
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Eixos X, Y, Z
    const axisLength = 300;

    const xAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), axisLength, 0xff0000, 20, 10);
    const yAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), axisLength, 0x00ff00, 20, 10);
    const zAxis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), axisLength, 0x0000ff, 20, 10);

    scene.add(xAxis);
    scene.add(yAxis);
    scene.add(zAxis);

    // Render loop
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});


//==================================================================

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


    // FUNÇÕES DE BOTÕES
    function addModule() {
    createModule();
    }

    function edtModule() {
    edtModule();
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


// Função de Criar Componentes

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

function init() {
    const container = document.getElementById('canvas-container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(300, 300, 300);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x1e1e1e);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    drawAxes();
    drawGrid();

    animate();
}

function drawAxes() {
    const axesLength = 500;

    const xAxis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), axesLength, 0xff0000);
    const yAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), axesLength, 0x00ff00);
    const zAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), axesLength, 0x0000ff);

    scene.add(xAxis);
    scene.add(yAxis);
    scene.add(zAxis);
}

function drawGrid() {
    const gridSize = 500;
    const gridDivisions = 50;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x888888);
    gridHelper.material.linewidth = 0.5;
    scene.add(gridHelper);
}

function addModule() {
    const largura = parseFloat(document.getElementById('width').value) || 500;
    const altura = parseFloat(document.getElementById('height').value) || 800;
    const profundidade = parseFloat(document.getElementById('depth').value) || 500;

    const espessuraLateral = parseFloat(document.getElementById('espessura-lateral').value) || 18;
    const espessuraBase = parseFloat(document.getElementById('espessura-base').value) || 18;
    const espessuraFundo = parseFloat(document.getElementById('espessura-fundo').value) || 6;

    const lateralMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const fundoMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
    const travessaMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: false });

    // Lateral esquerda
    const lateralEsquerdaGeo = new THREE.BoxGeometry(espessuraLateral, altura, profundidade);
    const lateralEsquerda = new THREE.Mesh(lateralEsquerdaGeo, lateralMaterial);
    lateralEsquerda.position.set(espessuraLateral / 2, altura / 2, profundidade / 2);
    scene.add(lateralEsquerda);

    // Lateral direita
    const lateralDireitaGeo = new THREE.BoxGeometry(espessuraLateral, altura, profundidade);
    const lateralDireita = new THREE.Mesh(lateralDireitaGeo, lateralMaterial);
    lateralDireita.position.set(largura - espessuraLateral / 2, altura / 2, profundidade / 2);
    scene.add(lateralDireita);

    // Base
    const baseGeo = new THREE.BoxGeometry(largura - 2 * espessuraLateral, espessuraBase, profundidade);
    const base = new THREE.Mesh(baseGeo, baseMaterial);
    base.position.set(largura / 2, espessuraBase / 2, profundidade / 2);
    scene.add(base);

    // Fundo
    const fundoGeo = new THREE.BoxGeometry(largura - 2 * espessuraLateral, altura, espessuraFundo);
    const fundo = new THREE.Mesh(fundoGeo, fundoMaterial);
    fundo.position.set(largura / 2, altura / 2, espessuraFundo / 2);
    scene.add(fundo);

    // Travessa Superior
    const travessaGeo = new THREE.BoxGeometry(largura - 2 * espessuraLateral, espessuraBase, espessuraBase);
    const travessa = new THREE.Mesh(travessaGeo, travessaMaterial);
    travessa.position.set(largura / 2, altura - espessuraBase / 2, profundidade - espessuraBase / 2);
    scene.add(travessa);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('DOMContentLoaded', init);




