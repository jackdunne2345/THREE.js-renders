import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';






const loader = new THREE.TextureLoader();

const black_Noise_Texture = new THREE.TextureLoader().load( "textures/scenebackground.jpg" );
//This defines how the texture is wrapped horizontally and corresponds to U in UV mapping.
black_Noise_Texture.wrapS = THREE.RepeatWrapping;

//This defines how the texture is wrapped vertically and corresponds to V in UV mapping.
black_Noise_Texture.wrapT = THREE.RepeatWrapping;

/*
How many times the texture is repeated across the surface,    
If repeat is set greater than 1 in either direction, 
the corresponding Wrap parameter 
should also be set to THREE.RepeatWrapping or 
THREE.MirroredRepeatWrapping to achieve the desired tiling effect.
*/
 black_Noise_Texture.repeat.set( 1, 1 , 1 );



const scene = new THREE.Scene()

//change scene background
scene.background = black_Noise_Texture;


/*   
uses the perspectiveCamera from THREE.js. there are other cameras.

attributes are:
field of view, aspect ratio, near and far
*/
let camera = new THREE.PerspectiveCamera(75,window.innerWidth / 
window.innerHeight,0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild(renderer.domElement,Element);

const controls = new PointerLockControls(camera, document.body);




/*
this object BoxGeometry will contain all the points for the 
vertices(a point where two or more line segments meet.In this case
    the corner of the box)
and fill the faces of the box
*/
const geometry = new THREE.BoxGeometry(1,1,1);

//Basic cub etexture
const material = new THREE.MeshBasicMaterial({color:0x00ff00});

//Basic mesh or model i think is another word?
const cube = new THREE.Mesh(geometry, material);


// plane geometry
const planeGeometry = new THREE.PlaneGeometry(100,100);

//plane material
const planeMaterial = new THREE.MeshBasicMaterial({color:0x999999, map: loader.load('textures/cobble.jpg'),});

//plane mesh
const plane = new THREE.Mesh(planeGeometry,planeMaterial);


/*
when function called the mesh added 
will be added to coordinates (0,0,0)
by default
*/
scene.add(cube);
cube.position.set(0,10,1);
scene.add(plane);
plane.position.set(0,0,-2);

/* 
gotta change the camera z position 
so we can view the object. By default it is also 0
*/
// camera.position.z=2;

camera.rotation.x = Math.PI * 0.5;
// camera.rotation.z = Math.PI * 4;


// this listens for keypresses and excutes 
// document.addEventListener('keydown', function (){
//     if (event.key === "w" || event.key === "W") {
//         camera.position.y +=0.09;
//   }}, false);

// document.addEventListener('keydown', function (){
//     if (event.key === "s" || event.key === "S") {
//     camera.position.y +=-0.09;
//   }}, false);

// document.addEventListener('keydown', function (){
//     if (event.key === "a" || event.key === "A") {
//     camera.position.x +=-0.09;
//   }}, false);

// document.addEventListener('keydown', function (){
//     if (event.key === "d" || event.key === "D") {
//     camera.position.x +=0.09;
//   }}, false);




//locks the mouse to the rendered scene
document.addEventListener('click', () => {
  controls.lock();
});


function animate() {
    
	requestAnimationFrame( animate );
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
   
}
animate();



