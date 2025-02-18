

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

    renderer.domElement.addEventListener('mousedown', onPieceClick);
    renderer.domElement.addEventListener('mousemove', onPieceMouseMove);
    renderer.domElement.addEventListener('mouseup', onPieceMouseUp);

    // window.addEventListener("keydown", moveSelectedPiece);



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
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        // wireframe: false

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
            piece.position.set(20, 0, 0); // Exemplo de movimentação manual

            // Aqui você pode ajustar a posição da peça manualmente depois
            console.log(`${pieceType} adicionada dentro do Driver-Block.`);
        }
    });

    //=============== Testando Funcionalidades de Pocicionamento da Peça  ========================



        // let selectedPiece = null;
        // let isDragging = false;
        // let pointMarker = null;

        // const raycaster = new THREE.Raycaster();
        // const mouse = new THREE.Vector2();
        // const planeNormal = new THREE.Vector3(0, 1, 0); // Plano XZ
        // const plane = new THREE.Plane(planeNormal, 0);
        // const intersectionPoint = new THREE.Vector3();
        // const clickOffset = new THREE.Vector3();

        // // Clique para selecionar a peça e exibir ponto 0,0,0
        // function onPieceClick(event) {
        //     mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        //     mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        //     raycaster.setFromCamera(mouse, camera);
        //     const intersects = raycaster.intersectObjects(driverBlock.children, true);

        //     if (intersects.length > 0) {
        //         const clickedPiece = intersects[0].object;

        //         // Se clicou novamente na mesma peça e no ponto marcador, inicia o arraste
        //         if (selectedPiece === clickedPiece && pointMarker) {
        //             const markerIntersects = raycaster.intersectObject(pointMarker);
        //             if (markerIntersects.length > 0) {
        //                 isDragging = true;
        //                 controls.enabled = false;
        //                 return;
        //             }
        //         }

        //         // Seleciona a nova peça e mostra o ponto 0,0,0
        //         selectedPiece = clickedPiece;
        //         showPointMarker(selectedPiece);
        //     } else {
        //         selectedPiece = null;
        //         removePointMarker();
        //     }
        // }

        // // Exibir ponto branco no canto inferior esquerdo (0,0,0) da peça
        // function showPointMarker(piece) {
        //     removePointMarker();

        //     const markerGeometry = new THREE.SphereGeometry(5, 16, 16);
        //     const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        //     pointMarker = new THREE.Mesh(markerGeometry, markerMaterial);

        //     // Define a posição do marcador NO CANTO INFERIOR ESQUERDO (0, 0, 0)
        //     pointMarker.position.set(0, 0, 0);

        //     // Adiciona o marcador como filho da peça (pra ele ir junto se mover)
        //     piece.add(pointMarker);
        // }

        // function removePointMarker() {
        //     if (pointMarker) {
        //         if (pointMarker.parent) {
        //             pointMarker.parent.remove(pointMarker);
        //         }
        //         pointMarker.geometry.dispose();
        //         pointMarker.material.dispose();
        //         pointMarker = null;
        //     }
        // }

        // // Arrastar a peça no plano XZ, ajustando o ponto clicado
        // function onPieceMouseMove(event) {
        //     if (!isDragging || !selectedPiece) return;

        //     mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        //     mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        //     raycaster.setFromCamera(mouse, camera);
        //     raycaster.ray.intersectPlane(plane, intersectionPoint);

        //     // O ponto 0,0,0 da peça deve coincidir com o ponto do mouse
        //     selectedPiece.position.x = intersectionPoint.x;
        //     selectedPiece.position.z = intersectionPoint.z;
        // }

        // // Soltar a peça ao soltar o mouse
        // function onPieceMouseUp() {
        //     if (isDragging) {
        //         isDragging = false;
        //         controls.enabled = true;
        //     }
        // }

//==============================================================

        // renderer.domElement.addEventListener("click", onPieceClick);

        // renderer.domElement.addEventListener('mousedown', onPieceClick);
        // renderer.domElement.addEventListener('mousemove', onPieceMouseMove);
        // renderer.domElement.addEventListener('mouseup', onPieceMouseUp);


    // let selectedPiece = null;
    // let pointMarker = null;

    // const raycaster = new THREE.Raycaster();
    // const mouse = new THREE.Vector2();
    // const intersectionPoint = new THREE.Vector3();

    // // Clique na peça ou na área CAD
    // function onPieceClick(event) {
    //     mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    //     raycaster.setFromCamera(mouse, camera);

    //     // 1️⃣ Primeiro verifica se clicou numa peça
    //     const intersectsPieces = raycaster.intersectObjects(driverBlock.children, true);

    //     if (intersectsPieces.length > 0) {
    //         const clickedPiece = intersectsPieces[0].object;

    //         // Se clicou em outra peça ou na mesma peça só pra selecionar
    //         if (selectedPiece !== clickedPiece) {
    //             selectedPiece = clickedPiece;
    //             showPointMarker(selectedPiece);
    //             console.log("Peça Selecionada:", selectedPiece.name);
    //         }
    //         // Se clicar na mesma peça de novo não faz nada (apenas seleciona e mostra o ponto)
    //         return;
    //     }

    //     // 2️⃣ Se tiver uma peça selecionada, verificar se clicou no chão (Driver-Block)
    //     if (selectedPiece) {
    //         const intersectsBase = raycaster.intersectObject(driverBlock, true);

    //         if (intersectsBase.length > 0) {
    //             intersectionPoint.copy(intersectsBase[0].point);

    //             // Move a peça para encaixar o canto inferior esquerdo no ponto clicado
    //             selectedPiece.position.x = intersectionPoint.x;
    //             selectedPiece.position.z = intersectionPoint.z;
    //             console.log(`Peça movida para: X:${intersectionPoint.x}, Z:${intersectionPoint.z}`);
    //         }
    //     }
    // }

    // // Exibir ponto branco no canto inferior esquerdo (0,0,0) da peça
    // function showPointMarker(piece) {
    //     removePointMarker();

    //     const markerGeometry = new THREE.SphereGeometry(5, 16, 16);
    //     const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    //     pointMarker = new THREE.Mesh(markerGeometry, markerMaterial);
    //     pointMarker.position.set(0, 0, 0);
    //     piece.add(pointMarker);
    // }

    // function removePointMarker() {
    //     if (pointMarker) {
    //         if (pointMarker.parent) {
    //             pointMarker.parent.remove(pointMarker);
    //         }
    //         pointMarker.geometry.dispose();
    //         pointMarker.material.dispose();
    //         pointMarker = null;
    //     }
    // }


let selectedPiece = null;
let isDragging = false;
let pointMarker = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const planeNormal = new THREE.Vector3(0, 1, 0); // Plano XZ
const plane = new THREE.Plane(planeNormal, 0);
const intersectionPoint = new THREE.Vector3();
const clickOffset = new THREE.Vector3();

// Clique para selecionar a peça e exibir ponto 0,0,0
function onPieceClick(event) {
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(driverBlock.children, true);

    if (intersects.length > 0) {
        const clickedPiece = intersects[0].object;

        // Se clicou novamente na mesma peça e no ponto marcador, inicia o arraste
        if (selectedPiece === clickedPiece && pointMarker) {
            const markerIntersects = raycaster.intersectObject(pointMarker);
            if (markerIntersects.length > 0) {
                isDragging = true;
                controls.enabled = false;
                return;
            }
        }

        // Seleciona a nova peça e mostra o ponto 0,0,0
        selectedPiece = clickedPiece;
        showPointMarker(selectedPiece);
    } else {
        selectedPiece = null;
        removePointMarker();
    }
}

// Exibir ponto branco no canto inferior esquerdo (0,0,0) da peça
function showPointMarker(piece) {
    removePointMarker();

    const markerGeometry = new THREE.SphereGeometry(5, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    pointMarker = new THREE.Mesh(markerGeometry, markerMaterial);

    // Define a posição do marcador NO CANTO INFERIOR ESQUERDO (0, 0, 0)
    pointMarker.position.set(0, 0, 0);

    // Adiciona o marcador como filho da peça (pra ele ir junto se mover)
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

// Arrastar a peça no plano XZ, ajustando o ponto clicado
function onPieceMouseMove(event) {
    if (!isDragging || !selectedPiece) return;

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    // O ponto 0,0,0 da peça deve coincidir com o ponto do mouse
    selectedPiece.position.x = intersectionPoint.x;
    selectedPiece.position.z = intersectionPoint.z;
}

// Soltar a peça ao soltar o mouse
function onPieceMouseUp() {
    if (isDragging) {
        isDragging = false;
        controls.enabled = true;
    }
}









