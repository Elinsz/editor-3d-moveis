// Configuração da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luzes
const light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Posição da câmera
camera.position.set(0, 100, 200);
camera.lookAt(0, 0, 0);

let modules = [];

// Função para adicionar um módulo
function addModule() {
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const depth = parseFloat(document.getElementById("depth").value);

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const module = new THREE.Mesh(geometry, material);

    module.position.set(0, height / 2, 0);
    scene.add(module);
    modules.push({ width, height, depth, position: module.position });
}

// Função para salvar os módulos no LocalStorage
function saveModules() {
    localStorage.setItem("modulos", JSON.stringify(modules));
    alert("Módulos salvos!");
}

// Função para carregar módulos salvos
function loadModules() {
    const savedModules = JSON.parse(localStorage.getItem("modulos") || "[]");
    savedModules.forEach(data => {
        const geometry = new THREE.BoxGeometry(data.width, data.height, data.depth);
        const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const module = new THREE.Mesh(geometry, material);

        module.position.set(data.position.x, data.position.y, data.position.z);
        scene.add(module);
    });
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
