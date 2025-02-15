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


//==================   Criar Componentes  =======================


    let driverBlock; // Variável global para o Driver-Block

    function addModule() {
        // Remove o Driver-Block anterior se existir
        if (driverBlock) {
            scene.remove(driverBlock);
        }

        // Captura as dimensões iniciais
        const width = parseFloat(document.getElementById('width').value);
        const height = parseFloat(document.getElementById('height').value);
        const depth = parseFloat(document.getElementById('depth').value);

        // Criação do Driver-Block transparente
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.1,
            wireframe: true,
        });

        driverBlock = new THREE.Mesh(geometry, material);
        driverBlock.position.set(width / 2, height / 2, depth / 2); // Centraliza na origem
        scene.add(driverBlock);

        // Atualiza as dimensões dinamicamente
        function updateDriverBlock() {
            const newWidth = parseFloat(document.getElementById('width').value);
            const newHeight = parseFloat(document.getElementById('height').value);
            const newDepth = parseFloat(document.getElementById('depth').value);

            driverBlock.geometry.dispose(); // Remove a geometria antiga
            driverBlock.geometry = new THREE.BoxGeometry(newWidth, newHeight, newDepth);
            driverBlock.position.set(newWidth / 2, newHeight / 2, newDepth / 2); // Centraliza na origem novamente
        }

        // Atualiza o Driver-Block ao clicar no botão "Aplicar"
        const applyButton = document.querySelector('#control-panel button[onclick="applyDimensions()"]');
        if (applyButton) {
            applyButton.onclick = function () {
                updateDriverBlock();
            };
        }
    }




