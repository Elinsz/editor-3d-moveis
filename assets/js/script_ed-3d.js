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


const larguraInput = document.getElementById('largura');
        const alturaInput = document.getElementById('altura');
        const profundidadeInput = document.getElementById('profundidade');
        const corInput = document.getElementById('cor');
        const criarNovoBlocoBtn = document.getElementById('criarNovoBloco');
        const exportarBtn = document.getElementById('exportar');
        const canvas = document.getElementById('canvas');

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(500, 500);

        let driverBlock = null;

        const geometry = new THREE.BoxGeometry(
            parseFloat(larguraInput.value),
            parseFloat(alturaInput.value),
            parseFloat(profundidadeInput.value)
        );
        const material = new THREE.MeshBasicMaterial({ color: corInput.value });

        camera.position.z = 300;

        // Função para aplicar as dimensões ao Driver-Block
        function applyDimensions() {
            if (driverBlock) {
                const largura = parseFloat(larguraInput.value);
                const altura = parseFloat(alturaInput.value);
                const profundidade = parseFloat(profundidadeInput.value);
                const cor = corInput.value;

                driverBlock.geometry = new THREE.BoxGeometry(largura, altura, profundidade);
                driverBlock.material = new THREE.MeshBasicMaterial({ color: cor });

                // Ajustando a posição do bloco para que fique "em pé"
                driverBlock.position.set(0, altura / 2, 0);
            }
        }

        // Função para criar um novo Driver-Block
        function createNewBlock() {
            // Remove o bloco atual, se existir
            if (driverBlock) {
                scene.remove(driverBlock);
            }

            // Cria o novo Driver-Block
            driverBlock = new THREE.Mesh(geometry, material);
            scene.add(driverBlock);

            // Atualiza a posição e dimensões do bloco
            applyDimensions();
        }

        criarNovoBlocoBtn.addEventListener('click', createNewBlock);
        larguraInput.addEventListener('input', applyDimensions);
        alturaInput.addEventListener('input', applyDimensions);
        profundidadeInput.addEventListener('input', applyDimensions);
        corInput.addEventListener('input', applyDimensions);

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();

        exportarBtn.addEventListener('click', () => {
            const formato = prompt("Escolha o formato de exportação (STL ou SKP)").toLowerCase();
            if (formato === 'stl') {
                exportSTL();
            } else if (formato === 'skp') {
                exportSKP();
            } else {
                alert("Formato inválido!");
            }
        });

        function exportSTL() {
            const exporter = new THREE.STLExporter();
            const stlData = exporter.parse(driverBlock);
            downloadFile(stlData, 'componente.stl', 'application/sla');
        }

        function exportSKP() {
            alert("Exportação para SKP ainda não implementada.");
        }

        function downloadFile(data, filename, mimeType) {
            const blob = new Blob([data], { type: mimeType });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }






