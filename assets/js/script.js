let scene, camera, renderer, controls;
let modules = [];

function init() {
    scene = new THREE.Scene();

    // Ambiente 3D com paredes, piso e teto simulando uma sala
    const roomSize = 500;
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, side: THREE.BackSide });
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });

    const roomGeometry = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
    const room = new THREE.Mesh(roomGeometry, wallMaterial);
    room.position.y = roomSize / 2;
    scene.add(room);

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

    // Controles de câmera: Zoom, Rotação e Pan
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    animate();
}

function addModule() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const depth = parseFloat(document.getElementById('depth').value);

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
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
        const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
        const module = new THREE.Mesh(geometry, material);
        module.position.set(data.x, data.y, data.z);
        modules.push(module);
        scene.add(module);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.classList.toggle('active');
        });
    });

    const controlPanel = document.getElementById('control-panel');
    controlPanel.style.display = 'flex';
    controlPanel.style.flexDirection = 'column';
    controlPanel.style.gap = '10px';

    init();

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

    const espessuraMenu = document.getElementById('espessura-menu');
    const materialMenu = document.getElementById('material-menu');

    for (const [parte, valores] of Object.entries(espessuras)) {
        const label = document.createElement('label');
        label.textContent = `Espessura ${parte}:`;
        const select = document.createElement('select');
        valores.forEach(v => select.add(new Option(`${v} mm`, v)));
        espessuraMenu.appendChild(label);
        espessuraMenu.appendChild(select);
    }

    for (const [parte, valores] of Object.entries(materiais)) {
        const label = document.createElement('label');
        label.textContent = `Material ${parte}:`;
        const select = document.createElement('select');
        valores.forEach(v => select.add(new Option(v, v)));
        materialMenu.appendChild(label);
        materialMenu.appendChild(select);
    }

    console.log('Espessuras:', espessuras);
    console.log('Materiais:', materiais);
});
