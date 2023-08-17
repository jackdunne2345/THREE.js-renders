import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';




const moveSpeed = 0.25;



/*
LINE 10: 
wrapS defines how the texture is wrapped horizontally and corresponds to U in UV mapping.

LINE 11:
wrapT defines how the texture is wrapped vertically and corresponds to V in UV mapping.

LINE 17:
How many times the texture is repeated across the surface,    
If repeat is set greater than 1 in either direction, 
the corresponding Wrap parameter 
should also be set to THREE.RepeatWrapping or 
THREE.MirroredRepeatWrapping to achieve the desired tiling effect.

LINE 27:
.background defines the sky assigned it my custom texture. can take a colour, texture and "SKYBOX?????"

LINE:30 
uses the perspectiveCamera from THREE.js. there are other cameras.
attributes are field of view, aspect ratio, near and f

LINE 40: 
this object BoxGeometry will contain all the points for the 
vertices(a point where two or more line segments meet.In this case
    the 4 corner of the box)
and fill the faces of the box


LINE: 49
a mesh needs a geometry and a material
*/
const loader = new THREE.TextureLoader();
const black_Noise_Texture = new THREE.TextureLoader().load( "textures/scenebackground.jpg" );
  black_Noise_Texture.wrapS = THREE.RepeatWrapping;
  black_Noise_Texture.wrapT = THREE.RepeatWrapping;
  black_Noise_Texture.repeat.set( 1, 1 , 1 );
const scene = new THREE.Scene()
  scene.background = black_Noise_Texture;
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
const controls = new PointerLockControls(camera, document.body);
document.body.appendChild(renderer.domElement,Element);
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.set(0,1,-6);
const plane_Geometry = new THREE.PlaneGeometry(100,100);
const plane_Material = new THREE.MeshBasicMaterial({color:0x999999, map: loader.load('textures/cobble.jpg'),});
const plane = new THREE.Mesh(plane_Geometry,plane_Material);
  scene.add(plane);
  plane.position.set(0,-2,0);
  plane.rotateX(-1.570796)




// these two fucntions triggers the movment functions of pointerlock
// const forwardAndBack = (event) => {
//   switch (event.key) {
//     case 'w':
//       controls.moveForward(moveSpeed);
//       break;
//     case 's':
//       controls.moveForward(-moveSpeed);
//       break;
//   }
// }

// const leftAndRight = (event) => {
//   switch (event.key) {
//     case 'a':
//       controls.moveRight(-moveSpeed);
//       break;
//     case 'd':
//       controls.moveRight(moveSpeed);
//       break;
//   }
// }

// addEventListener('keypressed', forwardAndBack);
// addEventListener('keypressed', leftAndRight);


let isJumping = false;
let verticalVelocity = 0;
const jumpHeight = 1.5;
const gravity = 0.02;
let keys =[];

document.addEventListener('keydown',(event) => {
  keys[event.key]= true;
  if (event.key==" ") {
    isJumping = true;
    verticalVelocity = 0.4; // Initial jump velocity
    keys[event.key]= false;
  }

});
document.addEventListener('keyup',(event) => {
  keys[event.key]= false;
});

function keyboardControls(){

  if(keys['w']){
    controls.moveForward(moveSpeed);
  }
  if(keys['s']){
    controls.moveForward(-moveSpeed);
  }
  if(keys['a']){
    controls.moveRight(-moveSpeed);
  }
  if(keys['d']){
    controls.moveRight(moveSpeed);
  }
  if(keys[" "]){
    
  }
}

document.addEventListener('click', () => {
  controls.lock();
});




function animate() {
  if (isJumping) {
    verticalVelocity -= gravity;
    controls.getObject().position.y += verticalVelocity;

    // If camera reaches the ground, stop jumping
    if (controls.getObject().position.y < 0) {
      isJumping = false;
      controls.getObject().position.y = 1;
      verticalVelocity = 0;
    }
  }
	requestAnimationFrame( animate );
  keyboardControls();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();



