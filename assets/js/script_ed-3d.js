let scene, camera, renderer, controls, driverBlock;

function addEnvironment() {
    const container = document.getElementById("canvas-container");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 20000);
    camera.position.set(500, 500, 500);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    // directionalLight.position.set(1, 1, 1);
    // scene.add(directionalLight);

    // const axesHelper = new THREE.AxesHelper(500);
    // scene.add(axesHelper);

    // const gridHelper = new THREE.GridHelper(1000, 50, 0x888888, 0x444444);
    // gridHelper.position.set(0, 0, 0);
    // scene.add(gridHelper);


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


    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function addModule() {
    if (driverBlock) {
        scene.remove(driverBlock);
        driverBlock.geometry.dispose();
        driverBlock.material.dispose();
    }

    const width = parseFloat(document.getElementById('width').value) || 500;
    const height = parseFloat(document.getElementById('height').value) || 800;
    const depth = parseFloat(document.getElementById('depth').value) || 500;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });

    driverBlock = new THREE.Mesh(geometry, material);
    driverBlock.position.set(0, height / 2, 0);
    scene.add(driverBlock);
}

function applyDimensions() {
    if (!driverBlock) {
        alert("Nenhum Driver-Block foi criado. Clique em 'Criar Novo Bloco' primeiro.");
        return;
    }

    const width = parseFloat(document.getElementById('width').value) || 500;
    const height = parseFloat(document.getElementById('height').value) || 800;
    const depth = parseFloat(document.getElementById('depth').value) || 500;

    driverBlock.geometry.dispose();
    driverBlock.geometry = new THREE.BoxGeometry(width, height, depth);
    driverBlock.position.set(0, height / 2, 0);
}

    window.onload = addEnvironment;


    // CONTROLE DOS DROPDOWNS
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', function () {
            const menu = this.parentElement;
            menu.classList.toggle('active');
        });
    });



    //=======================================================================

    // CRIAR PEÇAS INDIVIDUIAS

    // const larguraInput = document.getElementById('largura');
    // const alturaInput = document.getElementById('altura');
    // const profundidadeInput = document.getElementById('profundidade');
    // const corInput = document.getElementById('cor');
    // const criarNovoBlocoBtn = document.getElementById('criarNovoBloco');
    const adicionarLateralBtn = document.getElementById('adicionarLateral');
    const exportarBtn = document.getElementById('exportar');
    const canvas = document.getElementById('canvas');

    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    // const renderer = new THREE.WebGLRenderer({ canvas });
    // renderer.setSize(500, 500);

    // let driverBlock = null;
    let lateral = null;

    camera.position.z = 300;

    // Função para aplicar as dimensões e a cor ao Driver-Block
    // function applyDimensions() {
    //     if (driverBlock) {
    //         const largura = parseFloat(larguraInput.value);
    //         const altura = parseFloat(alturaInput.value);
    //         const profundidade = parseFloat(profundidadeInput.value);
    //         const cor = corInput.value;

    //         // Atualiza a geometria do bloco
    //         driverBlock.geometry = new THREE.BoxGeometry(largura, altura, profundidade);
    //         driverBlock.material = new THREE.MeshBasicMaterial({ color: cor });

    //         // Ajusta a posição do bloco para que fique "em pé"
    //         driverBlock.position.set(0, altura / 2, 0);
    //     }
    // }

    // Função para criar um novo Driver-Block
    function createNewBlock() {
        // Remove o bloco atual, se existir
        if (driverBlock) {
            scene.remove(driverBlock);
        }

        // Cria o novo Driver-Block
        const largura = parseFloat(larguraInput.value);
        const altura = parseFloat(alturaInput.value);
        const profundidade = parseFloat(profundidadeInput.value);
        const cor = corInput.value;

        const geometry = new THREE.BoxGeometry(largura, altura, profundidade);
        const material = new THREE.MeshBasicMaterial({ color: cor });
        driverBlock = new THREE.Mesh(geometry, material);
        scene.add(driverBlock);

        // Atualiza a posição e dimensões do bloco
        driverBlock.position.set(0, altura / 2, 0);
    }

    // Função para criar a Lateral (adicionada ao Driver-Block)
    function createLateral(largura, altura, espessura) {
        const lateralGeometry = new THREE.BoxGeometry(largura, altura, espessura);
        const lateralMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const lateralMesh = new THREE.Mesh(lateralGeometry, lateralMaterial);
        return lateralMesh;
    }

    // Função para adicionar a Lateral ao Driver-Block
    function addLateralToDriverBlock() {
        if (driverBlock) {
            lateral = createLateral(80, 100, 18); // Exemplo de tamanho da lateral
            driverBlock.add(lateral); // Adiciona a lateral ao Driver-Block

            // Movimenta a lateral dentro do Driver-Block
            lateral.position.set(20, 0, 0); // Ajuste manual da posição
        } else {
            alert("Crie primeiro o Driver-Block!");
        }
    }

    // Quando o botão "Criar Novo Bloco" for clicado
    // criarNovoBlocoBtn.addEventListener('click', createNewBlock);

    // Quando o botão "Adicionar Lateral" for clicado
    adicionarLateralBtn.addEventListener('click', addLateralToDriverBlock);

    // Atualiza as dimensões do bloco conforme os inputs
    // larguraInput.addEventListener('input', applyDimensions);
    // alturaInput.addEventListener('input', applyDimensions);
    // profundidadeInput.addEventListener('input', applyDimensions);
    // corInput.addEventListener('input', applyDimensions);

    // function animate() {
    //     requestAnimationFrame(animate);
    //     renderer.render(scene, camera);
    // }

    animate();

    // exportarBtn.addEventListener('click', () => {
    //     const formato = prompt("Escolha o formato de exportação (STL ou SKP)").toLowerCase();
    //     if (formato === 'stl') {
    //         exportSTL();
    //     } else if (formato === 'skp') {
    //         exportSKP();
    //     } else {
    //         alert("Formato inválido!");
    //     }
    // });

    // function exportSTL() {
    //     const exporter = new THREE.STLExporter();
    //     const stlData = exporter.parse(driverBlock);
    //     downloadFile(stlData, 'componente.stl', 'application/sla');
    // }

    // function exportSKP() {
    //     alert("Exportação para SKP ainda não implementada.");
    // }

    // function downloadFile(data, filename, mimeType) {
    //     const blob = new Blob([data], { type: mimeType });
    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.download = filename;
    //     link.click();
    // }

