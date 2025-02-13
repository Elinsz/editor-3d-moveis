let scene, camera, renderer;
let modules = [];

function init() {
    scene = new THREE.Scene();

    // Ambiente 3D com paredes, piso e teto simulando uma sala
    const roomSize = 500;
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, side: THREE.BackSide });
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 });

    const roomGeometry = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
    const room = new THREE.Mesh(roomGeometry, wallMaterial);
    room.position.y = roomSize / 2;
    scene.add(room);

    // Piso separado para melhor visualização
    const floorGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.1;
    scene.add(floor);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(200, 200, 300);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 250, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    animate();
}

function addModule() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const depth = parseFloat(document.getElementById('depth').value);

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const module = new THREE.Mesh(geometry, material);
    module.position.y = height / 2;
    modules.push(module);
    scene.add(module);
}

function saveModules() {
    const moduleData = modules.map(mod => ({ x: mod.position.x, y: mod.position.y, z: mod.position.z }));
    localStorage.setItem('modules', JSON.stringify(moduleData));
}

function loadModules() {
    const moduleData = JSON.parse(localStorage.getItem('modules')) || [];
    moduleData.forEach(data => {
        const geometry = new THREE.BoxGeometry(500, 800, 500);
        const material = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
        const module = new THREE.Mesh(geometry, material);
        module.position.set(data.x, data.y, data.z);
        modules.push(module);
        scene.add(module);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.classList.toggle('active');
        });
    });

    // Botões organizados na vertical
    const controlPanel = document.getElementById('control-panel');
    controlPanel.style.display = 'flex';
    controlPanel.style.flexDirection = 'column';
    controlPanel.style.gap = '10px';

    init();

    // Configurações padrão de espessuras e materiais
    const espessuras = {
        lateral: [15, 18, 25],
        fundo: [6, 9, 12, 15, 18, 25],
        base: [15, 18, 25],
        frente: [15, 18, 25],
        travessa: [15, 18, 25]
    };

    const materiais = {
        lateral: ['Branco', 'Madeira', 'Cinza'],
        fundo: ['Branco', 'Madeira', 'Cinza'],
        base: ['Branco', 'Madeira', 'Cinza'],
        frente: ['Branco', 'Madeira', 'Cinza'],
        travessa: ['Branco', 'Madeira', 'Cinza']
    };

    console.log('Espessuras:', espessuras);
    console.log('Materiais:', materiais);
});
