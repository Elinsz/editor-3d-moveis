

let scene, camera, renderer, controls, driverBlock;

function addEnvironment() {

    const container = document.getElementById("canvas-container");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 20000);
    // camera.position.set(500, 500, 500);
    camera.position.set(-500, 300, -500); // X: direita, Y: altura, Z: para trás
    camera.lookAt(0, 0, 0);


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

    renderer.domElement.addEventListener("click", onPieceClick);
    // window.addEventListener("keydown", moveSelectedPiece);

    renderer.domElement.addEventListener('mousedown', onPieceClick);
    renderer.domElement.addEventListener('mousemove', onPieceMouseMove);
    renderer.domElement.addEventListener('mouseup', onPieceMouseUp);

//===============================================================================

        // Grade infinita
            // const gridHelper = new THREE.GridHelper(10000, 500, 0x888888, 0x444444);
            // gridHelper.material.opacity = 0.5;
            // gridHelper.material.transparent = true;

            // scene.add(gridHelper);

        // Rotacionar 180 graus em torno do eixo Z
            // gridHelper.rotation.z = Math.PI;

        // Eixos X, Y, Z
            // const axisLength = 300;

            // const xAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), axisLength, 0xff0000, 20, 10);
            // const yAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), axisLength, 0x00ff00, 20, 10);
            // const zAxis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), axisLength, 0x0000ff, 20, 10);

            // scene.add(xAxis);
            // scene.add(yAxis);
            // scene.add(zAxis);

    // animate();

    // Grade infinita
    const gridHelper = new THREE.GridHelper(10000, 500, 0x888888, 0x444444);
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;

    // Rotacionar a grade em 180 graus em torno do eixo Z
    gridHelper.rotation.y = Math.PI; // Esta rotação gira a grade como você espera

    scene.add(gridHelper);

    // Eixos X, Y, Z
    const axisLength = 300;

    const xAxis = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, 0),
        axisLength,
        0xff0000,
        20,
        10
    );
    const yAxis = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        axisLength,
        0x00ff00,
        20,
        10
    );
    const zAxis = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 0, 0),
        axisLength,
        0x0000ff,
        20,
        10
    );

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

    const width = parseFloat(document.getElementById('depth').value) || 300;
    const height = parseFloat(document.getElementById('height').value) || 750;
    const depth = parseFloat(document.getElementById('width').value) || 500;

    const geometry = new THREE.BoxGeometry(width , height, depth);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });

    driverBlock = new THREE.Mesh(geometry, material);
    driverBlock.position.set(width / 2, height / 2, depth / 2);
    scene.add(driverBlock);
}

function applyDimensions() {
    if (!driverBlock) {
        alert("Nenhum Driver-Block foi criado. Clique em 'Criar Novo Bloco' primeiro.");
        return;
    }

    const width = parseFloat(document.getElementById('depth').value) || 300;
    const height = parseFloat(document.getElementById('height').value) || 750;
    const depth = parseFloat(document.getElementById('width').value) || 500;

    driverBlock.geometry.dispose();
    driverBlock.geometry = new THREE.BoxGeometry(width , height, depth);
    driverBlock.position.set(width /2 , height / 2, depth / 2);
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

            // // CRIAR PEÇAS INDIVIDUIAS


            // function createLateral(altura, profundidade, espessura, cor = 0xff0000) {
            //     const geometry = new THREE.BoxGeometry(
            //         espessura, // X → Espessura
            //         profundidade, // Y → Profundidade
            //         altura // Z → Altura
            //     );

            //     // Ajusta a geometria para que o canto inferior esquerdo fique em (0, 0, 0)
            //     geometry.translate(espessura / 2, profundidade / 2, altura / 2);

            //     const material = new THREE.MeshBasicMaterial({
            //         color: cor,
            //         transparent: true,
            //         opacity: 0.5,
            //     });

            //     const lateral = new THREE.Mesh(geometry, material);
            //     lateral.userData.pieceType = 'Lateral'; // só pra facilitar se precisar no futuro

            //     return lateral;
            // }



            // function createBase(largura, profundidade, espessura, cor = 0x00ff00) {
            //     const geometry = new THREE.BoxGeometry(
            //         largura, // X → Largura
            //         profundidade, // Y → Profundidade
            //         espessura // Z → Espessura
            //     );

            //     const material = new THREE.MeshBasicMaterial({
            //         color: cor,
            //         transparent: true,
            //         opacity: 0.5,
            //     });

            //     const base = new THREE.Mesh(geometry, material);
            //     base.position.set(0, 0, 0);
            //     return base;
            // }

// CRIAR PEÇAS INDIVIDUAIS

function createLateral(altura, profundidade, espessura, cor = 0xff0000) {
    const geometry = new THREE.BoxGeometry(
        espessura, // X → Espessura
        altura, // Z → Altura
        profundidade // Y → Profundidade
    );

    // Ajusta a geometria para que o canto inferior esquerdo fique em (0, 0, 0)
    geometry.translate(espessura / 2, altura /2, -profundidade /2);

    const material = new THREE.MeshBasicMaterial({
        color: cor,
        transparent: true,
        opacity: 0.5,
    });

    const lateral = new THREE.Mesh(geometry, material);

    // Rotaciona a peça em 90° para que ela fique "em pé"
    lateral.rotation.y = -Math.PI / 2;

    lateral.userData.pieceType = 'Lateral';

    return lateral;
}

function createBase(largura, profundidade, espessura, cor = 0x00ff00) {
    const geometry = new THREE.BoxGeometry(
        espessura, // X → Espessura
        altura, // Z → Altura
        profundidade // Y → Profundidade

    );

    const material = new THREE.MeshBasicMaterial({
        color: cor,
        transparent: true,
        opacity: 0.5,
    });

    const base = new THREE.Mesh(geometry, material);
    base.position.set(0, 0, 0);
    return base;
}



    // Vincular ao botão "Posicionar Peça"
    document.getElementById("adicionarLateral").addEventListener("click", () => {
        if (!driverBlock) {
            alert("Crie um Driver-Block primeiro (Criar Novo Bloco)");
            return;
        }

        const pieceType = document.getElementById("piece-type").value;
        let piece = null;

        // Pegando as dimensões das configurações do Driver-Block
        const altura = parseFloat(document.getElementById('width').value) || 500;
        const largura = parseFloat(document.getElementById('height').value) || 800;
        const profundidade = parseFloat(document.getElementById('depth').value) || 500;
        const espessuraPadrao = 18;

        switch (pieceType) {
            case "Lateral Direita":
            case "Lateral Esquerda":
                piece = createLateral(altura, profundidade, espessuraPadrao);
                break;
            case "Base Inf":
            case "Base Sup":
                piece = createBase(largura, profundidade, espessuraPadrao);
                break;
            case "Frente Gaveta":
                alert("Frente Gaveta ainda não implementada");
                break;
            case "Porta Dir":
            case "Porta Esq":
                alert("Porta ainda não implementada");
                break;
            default:
                alert("Seleção inválida.");
        }

        if (piece) {
            driverBlock.add(piece);
            // piece.position.set(0, 0, 0); // Posição inicial dentro do Driver-Block
            piece.position.set(50, 0, 0); // Exemplo de movimentação manual

            // Aqui você pode ajustar a posição da peça manualmente depois
            console.log(`${pieceType} adicionada dentro do Driver-Block.`);
        }
    });




    //=============== Testando Funcionalidades de Pocicionamento da Peça  ========================


    let selectedPiece = null;
    let pointMarker = null;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const intersectionPoint = new THREE.Vector3();

    // Clique na peça ou na área CAD
    function onPieceClick(event) {
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // 1️⃣ Primeiro tentamos clicar nas peças (seleção)
        const intersectsPieces = raycaster.intersectObjects(driverBlock.children, true);

        if (intersectsPieces.length > 0) {
            // Clicou em uma peça → Selecionar e exibir ponto 0,0,0
            const clickedPiece = intersectsPieces[0].object;

            // Evita "re-selecionar" desnecessariamente
            if (selectedPiece !== clickedPiece) {
                selectedPiece = clickedPiece;
                showPointMarker(selectedPiece);
                console.log("Peça Selecionada:", selectedPiece.name);
            }
            return; // Evita continuar pro clique na base
        }

        // 2️⃣ Se não clicou em peça, mas tem uma peça selecionada → Posicionar na base (Driver-Block)
        if (selectedPiece) {
            const intersectsBase = raycaster.intersectObject(driverBlock, true); // Base ou outro objeto como piso do driver-block

            if (intersectsBase.length > 0) {
                // Encaixar o ponto (0,0,0) da lateral na posição clicada
                intersectionPoint.copy(intersectsBase[0].point);

                selectedPiece.position.x = intersectionPoint.x;
                selectedPiece.position.z = intersectionPoint.z;
                console.log(`Peça movida para: ${intersectionPoint.x}, ${intersectionPoint.y}, ${intersectionPoint.z}`);
            }
        }
    }

    // Exibir ponto branco no canto inferior esquerdo (0,0,0) da peça
    function showPointMarker(piece) {
        removePointMarker();

        const markerGeometry = new THREE.SphereGeometry(5, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        pointMarker = new THREE.Mesh(markerGeometry, markerMaterial);
        pointMarker.position.set(0, 0, 0);
        piece.add(pointMarker);
    }

    function removePointMarker() {
        if (pointMarker) {
            if (pointMarker.parent) {
                pointMarker.parent.remove(pointMarker);
            }
            pointMarker.geometry.dispose();
            pointMarker.material.dispose();
            pointMarker = null;
        }
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




