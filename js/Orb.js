var scene = new THREE.Scene();
        
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0, 0, 25);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#333333");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshLambertMaterial({color: 0xffffff})
// var mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

meshX = -10;
for (var i = 0; i<8; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    mesh.rotation.x = 1;
    mesh.rotation.y = 1;
    mesh.rotation.z = 1;
    scene.add(mesh);
    meshX+=1;
}


var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0, -25, 10);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0, 25, 10);
scene.add(light);

var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function onMouseClick(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 -1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.position, 3, {x: ((Math.random() - 0.5) * 4) * Math.PI, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.position, 3, {y: ((Math.random() - 0.5) * 4) * Math.PI, ease: Expo.easeOut}, "=-3")
        this.tl.to(intersects[i].object.position, 3, {z: ((Math.random() - 0.5) * 4) * Math.PI, ease: Expo.easeOut}, "=-3")
        this.tl.to(intersects[i].object.rotation, 3, {x: ((Math.random() - 0.5) * 4), ease: Expo.easeOut}, "=-3")
        this.tl.to(intersects[i].object.rotation, 3, {y: ((Math.random() - 0.5) * 4), ease: Expo.easeOut}, "=-3")
        this.tl.to(intersects[i].object.rotation, 3, {z: ((Math.random() - 0.5) * 4), ease: Expo.easeOut}, "=-3")
        this.tl.to(intersects[i].object.position, 3, {x: 0, ease: Expo.easeIn})
        this.tl.to(intersects[i].object.position, 3, {y: 0, ease: Expo.easeIn}, "=-3")
        this.tl.to(intersects[i].object.position, 3, {z: 0, ease: Expo.easeIn}, "=-3")
        this.tl.to(intersects[i].object.rotation, 3, {x: 1, ease: Expo.easeIn}, "=-3")
        this.tl.to(intersects[i].object.rotation, 3, {y: 1, ease: Expo.easeIn}, "=-3")
        this.tl.to(intersects[i].object.rotation, 3, {z: 1, ease: Expo.easeIn}, "=-3")
    }
}

render();



window.addEventListener('mousedown', onMouseClick);