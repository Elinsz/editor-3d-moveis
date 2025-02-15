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


const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    const tableGeometry = new THREE.BoxGeometry(2, 0.1, 1);
    const tableMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.y = -0.5;
    scene.add(table);

    const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const legMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    for (let i = 0; i < 4; i++) {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set((i % 2) * 1.9 - 0.95, -0.75, Math.floor(i / 2) * 0.9 - 0.45);
    scene.add(leg);
}


const components = {
    table: { geometry: tableGeometry, material: tableMaterial },
    chair: { geometry: chairGeometry, material: chairMaterial },
  };


  function addComponent(name, position) {
    const componentData = components[name];
    if (!componentData) return;
    const component = new THREE.Mesh(componentData.geometry, componentData.material);
    component.position.copy(position);
    scene.add(component);
  }

  addComponent('table', new THREE.Vector3(0, 0, 0));

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();








