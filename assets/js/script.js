let scene, camera, renderer;
let modules = [];

function init() {
    scene = new THREE.Scene();

    // Ambiente 3D com paredes, piso e teto
    const roomSize = 500;
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.BackSide });

    const roomGeometry = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
    const room = new THREE.Mesh(roomGeometry, wallMaterial);
    room.position.y = roomSize / 2;
    scene.add(room);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(100, 100, 200);
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
        const geometry = new THREE.BoxGeometry(50, 80, 50);
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
    init();
});
