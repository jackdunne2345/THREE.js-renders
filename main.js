import * as THREE from 'three';

const scene = new THREE.Scene();

/*   
uses the perspectiveCamera from THREE.js.

attributes are:
field of view, aspect ratio, near and far
*/
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / 
window.innerHeight,0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/2, window.innerHeight/2, false);
document.body.appendChild(renderer.domElement,Element);

/*this object BoxGeometry will contain all the points for the 
vertices(a point where two or more line segments meet.In this case
    the corner of the box)
and fill the faces of the box*/
const geometry = new THREE.BoxGeometry(1,1,1);
//Basic texture
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
//Basic mesh or model i think is another word?
const cube = new THREE.Mesh(geometry, material);
//when function called the thing added will be added to coordinates (0,0,0)
scene.add(cube);
camera.position.z=5;

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();
