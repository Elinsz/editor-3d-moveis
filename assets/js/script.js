// Inicialização da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controle de movimento, zoom e rotação
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Adicionar o fundo 3D com paredes, piso e teto
function addEnvironment() {
    // Piso
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Piso virado para cima
    scene.add(floor);

    // Paredes (4)
    const wallGeometry = new THREE.PlaneGeometry(1000, 1000);
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide });

    // Parede frontal
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.z = -500; // Coloca a parede na frente
    scene.add(wall1);

    // Parede de trás
    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.rotation.y = Math.PI; // Rotaciona para ficar atrás
    wall2.position.z = 500; // Coloca a parede atrás
    scene.add(wall2);

    // Parede da esquerda
    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.rotation.y = Math.PI / 2; // Rotaciona para a lateral
    wall3.position.x = 500; // Coloca a parede na lateral direita
    scene.add(wall3);

    // Parede da direita
    const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall4.rotation.y = -Math.PI / 2; // Rotaciona para a lateral
    wall4.position.x = -500; // Coloca a parede na lateral esquerda
    scene.add(wall4);

    // Teto
    const ceilingGeometry = new THREE.PlaneGeometry(1000, 1000);
    const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2; // Teto virado para baixo
    ceiling.position.y = 500; // Coloca o teto acima
    scene.add(ceiling);
}

// Adiciona o ambiente 3D
addEnvironment();

// Função para criar o módulo 3D
function createModule() {
    const geometry = new THREE.BoxGeometry(200, 400, 300); // módulo de exemplo
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const module = new THREE.Mesh(geometry, material);
    scene.add(module);
}

// Adiciona um módulo inicial
createModule();

// Posiciona a câmera
camera.position.z = 1000;

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Atualiza o controle
    controls.update();

    // Renderiza a cena
    renderer.render(scene, camera);
}

// Inicia a animação
animate();

// Funções de controle para interação
function addModule() {
    createModule();
}

function saveModules() {
    console.log('Salvar módulos...');
}

function loadModules() {
    console.log('Carregar módulos...');
}

// Função para gerenciar o comportamento dos menus dropdown
const dropdownBtns = document.querySelectorAll('.dropdown-btn');
dropdownBtns.forEach(button => {
    button.addEventListener('click', function (event) {
        const menu = this.parentElement;
        menu.classList.toggle('active'); // Adiciona ou remove a classe "active"
        event.stopPropagation(); // Impede que o clique se propague e feche outros menus
    });
});

// Fecha o menu quando clicar fora
document.addEventListener('click', function (event) {
    if (!event.target.closest('.menu')) {
        document.querySelectorAll('.menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});
