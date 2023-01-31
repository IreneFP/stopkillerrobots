import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


// -----------------------------------------------------------------------------------
// TEXT LOAD
//
var WebFont = require("webfontloader");
WebFont.load({
  google: {
    families: ["Droid Sans", "Droid Serif", "Inria Sans", "Raleway"],
  },
});

// -----------------------------------------------------------------------------------

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();

/**
 * Base
 */
// Debug
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const axeshelper = new THREE.AxesHelper();
// scene.add(axeshelper)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 1;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 1, 2.25);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  7,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 4, 160);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff, 0); // uncomment for white background


// -----------------------------------------------------------------------------------
// MODEL LOADERS
//

const folder_name = ['face1/', 'face2/', 'face3/']

folder_name.forEach((facename) => {
    // LEFT FACE ----
    gltfLoader.load("/models/"+facename+"1-face.glb", (gltf) => {
      gltf.scene.scale.set(7.5, 7.5, 7.5);
      gltf.scene.position.set(-7, -1, 0);
      gltf.scene.name = "face-left" + facename;
      gltf.scene.visible = false;
      scene.add(gltf.scene);
    });

    gltfLoader.load("/models/"+facename+"1-linechin.glb", (gltf) => {
      gltf.scene.scale.set(7.5, 7.5, 7.5);
      gltf.scene.position.set(-7, -1, 0);
      gltf.scene.name = "face-left-chin" + facename;
      gltf.scene.visible = false;
      scene.add(gltf.scene);
    });

    gltfLoader.load("/models/"+facename+"1-lineprofile.glb", (gltf) => {
      gltf.scene.scale.set(7.5, 7.5, 7.5);
      gltf.scene.position.set(-2, 0.8, -5);
      gltf.scene.name = "face-left-profile" + facename;
      gltf.scene.visible = false;
      scene.add(gltf.scene);
    });

    // RIGHT FACE ----
    gltfLoader.load("/models/"+facename+"2-face.glb", (gltf) => {
      gltf.scene.scale.set(7, 7, 7);
      gltf.scene.position.set(7, -1, 0);
      gltf.scene.name = "face-right" + facename;
      gltf.scene.visible = false;
      scene.add(gltf.scene);
    });

    gltfLoader.load("/models/"+facename+"2-linechin.glb", (gltf) => {
      gltf.scene.scale.set(7, 7, 7);
      gltf.scene.position.set(7, -1, 0);
      gltf.scene.name = "face-right-chin" + facename;
      gltf.scene.visible = false;
      scene.add(gltf.scene);
    });

    gltfLoader.load("/models/"+facename+"2-lineprofile.glb", (gltf) => {
      gltf.scene.scale.set(7, 7, 7);
      gltf.scene.position.set(11, 0.8, -5);
      gltf.scene.name = "face-right-profile" + facename;
      gltf.scene.visible = false;
      scene.add(gltf.scene);
    });

})

// const file = 'face1/'

// // LEFT FACE ----
// gltfLoader.load("/models/"+file+"1-face.glb", (gltf) => {
//   gltf.scene.scale.set(7.5, 7.5, 7.5);
//   gltf.scene.position.set(-7, -1, 0);
//   gltf.scene.name = "face-left";
//   gltf.scene.visible = false;
//   scene.add(gltf.scene);
// });

// gltfLoader.load("/models/"+file+"1-linechin.glb", (gltf) => {
//   gltf.scene.scale.set(7.5, 7.5, 7.5);
//   gltf.scene.name = "face-left-chin";
//   gltf.scene.visible = false;
//   scene.add(gltf.scene);
// });

// gltfLoader.load("/models/"+file+"1-lineprofile.glb", (gltf) => {
//   gltf.scene.scale.set(7.5, 7.5, 7.5);
//   gltf.scene.name = "face-left-profile";
//   gltf.scene.visible = false;
//   scene.add(gltf.scene);
// });

// // RIGHT FACE ----
// gltfLoader.load("/models/"+file+"2-face.glb", (gltf) => {
//   gltf.scene.scale.set(7, 7, 7);
//   gltf.scene.position.set(7, -1, 0);
//   gltf.scene.name = "face-right";
//   gltf.scene.visible = false;
//   scene.add(gltf.scene);
// });

// gltfLoader.load("/models/"+file+"2-linechin.glb", (gltf) => {
//   gltf.scene.scale.set(7, 7, 7);
//   gltf.scene.name = "face-right-chin";
//   gltf.scene.visible = false;
//   scene.add(gltf.scene);
// });

// gltfLoader.load("/models/"+file+"2-lineprofile.glb", (gltf) => {
//   gltf.scene.scale.set(7, 7, 7);
//   gltf.scene.name = "face-right-profile";
//   gltf.scene.visible = false;
//   scene.add(gltf.scene);
// });


// FOR EXPLORE

gltfLoader.load("/models/face1/1-face.glb", (gltf) => {
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(-10, -1, 0);
  gltf.scene.name = "face1-explore";
  gltf.scene.visible = false;
  scene.add(gltf.scene);
});

gltfLoader.load("/models//face2/1-face.glb", (gltf) => {
  gltf.scene.scale.set(4.5, 4.5, 4.5);
  gltf.scene.position.set(0, -1, 0);
  gltf.scene.name = "face2-explore";
  gltf.scene.visible = false;
  scene.add(gltf.scene);
});

gltfLoader.load("/models/face3/1-face.glb", (gltf) => {
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(10, -1, 0);
  gltf.scene.name = "face3-explore";
  gltf.scene.visible = false;

  scene.add(gltf.scene);
});


// -----------------------------------------------------------------------------------
// ANIMATION
//

const initdelay = 2 //seconds // will depend on Lateny 

var dictTimes1 = {
  Scene1: initdelay, 
  Scene11: 4,
  Scene12: 8,
  Scene2: 12,
  Scene3: 18,
  Scene31: 26,
  Scene4: 34,
  Scene5: 42,
  Scene6: 10,
};

var dictTimes23 = {
  Scene1: initdelay, 
  Scene2: 8,
  Scene3: 16,
  Scene4: 24,
  Scene5: 30,
};


// -----------------------------------------------------------------------------------
// PROGRESS BAR
//
const url = window.location.href.split("/")
let max_duration = 0
if (url[url.length - 1] == "history1.html") {
  max_duration = dictTimes1['Scene5']
}
else{
  max_duration = dictTimes23['Scene5']
}

if (url[url.length - 1] == "history1.html" || url[url.length - 1] == "history2.html" || url[url.length - 1] == "history3.html") {
    var bar = new ProgressBar.Line(container, {
        strokeWidth: 0.5,
        easing: "easeInOut",
        duration: max_duration * 1000, // seconds * 1000
        color: "yellow",
        trailColor: "gray",
        trailWidth: 1,
        svgStyle: { width: "100%", height: "100%" },
      });
      
      bar.animate(1.0); // Number from 0.0 to 1.0
}

// -----------------------------------------------------------------------------------
// FUNCTIONS
//
function normalize(val, min, max) {
  // Shift to positive to avoid issues when crossing the 0 line
  if (min < 0) {
    max += 0 - min;
    val += 0 - min;
    min = 0;
  }
  val = val - min;
  max = max - min;
  return Math.max(0, Math.min(1, val / max));
}

function lerpAnimation(object, endpoint, time, min, max) {
  let delta = normalize(time, min, max);
  if (delta < 1) {
    object.position.lerp(endpoint, delta);
  } else {
    object.position.copy(endpoint);
  }
}

function opacityBackground(id){
  if (alpha > 0) {
    document.getElementById(id).style.opacity = alpha
    alpha -= 0.01
  }
  else{
    document.getElementById(id).style.opacity = 0
  }
}

// -----------------------------------------------------------------------------------
// RAYCASTER
//

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
var target = new THREE.Vector3();

const onMouseMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2-1;
  pointer.y = (event.clientY / window.innerHeight) * 2-1;
      
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  if (intersects.length > 0) {
    target.x += ( pointer.x - target.x ) * 2;
    target.y += ( - pointer.y - target.y ) * 2 ;
    target.z = camera.position.z;
    intersects[0].object.lookAt(target)
  }
}

let i = 0
let URL = window.location.href.split("/").slice(0, -1).join('/')

function onClick(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2-1;
  pointer.y = (event.clientY / window.innerHeight) * 2-1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  while (i < intersects.length) {
    if (intersects[i].object.parent.name === 'face1-explore') {window.open (URL + "/history1.html", '_self')}
    if (intersects[i].object.parent.name === 'face2-explore') {window.open (URL + "/history2.html", '_self')}
    if (intersects[i].object.parent.name === 'face3-explore') {window.open (URL + "/history3.html", '_self')}
    i ++;
  }
  i = 0;
}

// -----------------------------------------------------------------------------------
// TICK FUNCTION
//

const cameramovementdelay = 4
const objectsmovementdelay = 2
let alpha = 1
let startTime = 0;
const clock = new THREE.Clock();

const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update object
  const tmp = window.location.href.split("/");
  const delay = 0.6;
  const rangeMovement = 0.2;
  
  if (tmp[tmp.length - 1] == "") {
    document.getElementById("background-history-id").style.opacity = 1
    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id")
      scene.getObjectByName("face-rightface1/").visible = true;
      scene.getObjectByName("face-leftface1/").visible = true;

      scene.getObjectByName("face-rightface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
    }
  }

////////////// -----------------------------------------------------------------------------------------------------

  // SCRIPT FOR HISTORY 1 ------------------------------------------------------------------------------------------
  if (tmp[tmp.length - 1] == "history1.html") {
    document.getElementById("background-history-id").style.opacity = 1

    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id")
      scene.getObjectByName("face-rightface1/").visible = true;
      scene.getObjectByName("face-leftface1/").visible = true;
      scene.getObjectByName("face-rightface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-chinface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-chinface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-profileface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-profileface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
  
    }
    // -------------------- Scene 1
    if (elapsedTime > dictTimes1["Scene1"]) {
      startTime = dictTimes1["Scene1"];
      scene
        .getObjectByName("face-leftface1/")
        .position.copy(new THREE.Vector3(-2, -3, 0));
      scene
        .getObjectByName("face-rightface1/")
        .position.copy(new THREE.Vector3(11, -3, 0));
    }
    // -------------------- Scene 1.1
    if (elapsedTime > dictTimes1["Scene11"]) {
      startTime = dictTimes1["Scene11"];
      document.getElementById("text2").innerHTML =
        "How does your brain recognize faces?";
    }
    // -------------------- Scene 1.2
    if (elapsedTime > dictTimes1["Scene12"]) {
      startTime = dictTimes1["Scene12"];
      document.getElementById("text2").innerHTML =
        "How do you know you’ve seen a friend across the road, or spot your child at school?";
    }
    // -------------------- Scene 2
    if (elapsedTime > dictTimes1["Scene2"]) {
      startTime = dictTimes1["Scene2"];
      document.getElementById("text2").innerHTML = "Is it by the arch of the chin?";
      lerpAnimation(
        camera,
        new THREE.Vector3(90, -20, 100),
        elapsedTime,
        startTime,
        startTime + cameramovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-leftface1/"),
        new THREE.Vector3(-2, 0.8, -5),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface1/"),
        new THREE.Vector3(11, 0.8, -5),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-left-chinface1/").visible = true;
      lerpAnimation(
        scene.getObjectByName("face-left-chinface1/"),
        scene.getObjectByName("face-leftface1/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-right-chinface1/").visible = true;
      lerpAnimation(
        scene.getObjectByName("face-right-chinface1/"),
        scene.getObjectByName("face-rightface1/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
    }
    // -------------------- Scene 3
    if (elapsedTime > dictTimes1["Scene3"]) {
      startTime = dictTimes1["Scene3"];
      document.getElementById("text2").innerHTML = "Or is it by the shape of the nose?";
      document.getElementById("text1").style.alignItems = "flex-end";
      document.getElementById("text2").style.textAlign = "right";

      lerpAnimation(
        camera,
        new THREE.Vector3(-80, 0, 90),
        elapsedTime,
        startTime,
        startTime + cameramovementdelay
      );

      lerpAnimation(
        scene.getObjectByName("face-leftface1/"),
        new THREE.Vector3(-2, 0, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface1/"),
        new THREE.Vector3(11, 0, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-left-chinface1/").visible = false;
      scene.getObjectByName("face-right-chinface1/").visible = false;

      scene.getObjectByName("face-left-profileface1/").visible = true;
      scene.getObjectByName("face-right-profileface1/").visible = true;

      lerpAnimation(
        scene.getObjectByName("face-left-profileface1/"),
        scene.getObjectByName("face-leftface1/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-right-profileface1/"),
        scene.getObjectByName("face-rightface1/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
    }
    // -------------------- Scene 3.1
    if (elapsedTime > dictTimes1["Scene31"]) {
      startTime = dictTimes1["Scene31"];
      lerpAnimation(
        camera,
        new THREE.Vector3(20, 0, 80),
        elapsedTime,
        startTime,
        startTime + cameramovementdelay
      );

      scene.getObjectByName("face-left-profileface1/").visible = false;
      scene.getObjectByName("face-right-profileface1/").visible = false;

      lerpAnimation(
        scene.getObjectByName("face-leftface1/"),
        new THREE.Vector3(-10, 0.8, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface1/"),
        new THREE.Vector3(8, 0.8, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-leftface1/").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });
      scene.getObjectByName("face-rightface1/").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });

      document.getElementById("text1").style.alignItems = "flex-start";
      document.getElementById("text1").style.padding = "200px 331px 400px 331px";
      document.getElementById("text2").style.textAlign = "center";
      document.getElementById("text2").style.maxWidth = "1258px";
      document.getElementById("text2").innerHTML = "Facial recognition technology takes your face and transforms it into data points.";
      document.getElementById("text3").innerHTML = "The algorithm compares the data points and determines if there is a match";
    }
    // -------------------- Scene 4
    if (elapsedTime > dictTimes1["Scene4"]) {
      startTime = dictTimes1["Scene4"];
      document.getElementById("text1").style.padding =
        "148px 226px 148px 226px";

      document.getElementById("text2").style.maxWidth = "1467px";
      document.getElementById("text2").style.fontSize = "180px";
      document.getElementById("text2").innerHTML = "These faces have a match percentage of 98%";
      document.getElementById("text3").innerHTML = "";
    }
    
    if (elapsedTime > dictTimes1["Scene5"]) {
      window.location.href = window.location.href.split("/")[0] + '/compare-face1.html'
      // document.getElementById("background-compare-id").style.opacity = 1
    }
  }
  
  // SCRIPT FOR HISTORY 2 ------------------------------------------------------------------------------------------
  if (tmp[tmp.length - 1] == "history2.html") {
    document.getElementById("background-history-id").style.opacity = 1

    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id")
      scene.getObjectByName("face-rightface2/").visible = true;
      scene.getObjectByName("face-leftface2/").visible = true;
      scene.getObjectByName("face-rightface2/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface2/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-chinface2/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-chinface2/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-profileface2/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-profileface2/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
  
    }
    // -------------------- Scene 1
    if (elapsedTime > dictTimes23["Scene1"]) {
      startTime = dictTimes23["Scene1"];
      scene
        .getObjectByName("face-leftface2/")
        .position.copy(new THREE.Vector3(-2, -3, 0));
      scene
        .getObjectByName("face-rightface2/")
        .position.copy(new THREE.Vector3(11, -3, 0));
    }

    // -------------------- Scene 2
    if (elapsedTime > dictTimes23["Scene2"]) {
      startTime = dictTimes23["Scene2"];
      document.getElementById("text2").innerHTML = "The arch of their chin is a 20% match";
      lerpAnimation(
        camera,
        new THREE.Vector3(90, -20, 100),
        elapsedTime,
        startTime,
        startTime + cameramovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-leftface2/"),
        new THREE.Vector3(-2, 0.8, -5),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface2/"),
        new THREE.Vector3(11, 0.8, -5),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-left-chinface2/").visible = true;
      lerpAnimation(
        scene.getObjectByName("face-left-chinface2/"),
        scene.getObjectByName("face-leftface2/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-right-chinface2/").visible = true;
      lerpAnimation(
        scene.getObjectByName("face-right-chinface2/"),
        scene.getObjectByName("face-rightface2/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
    }
    // -------------------- Scene 3
    if (elapsedTime > dictTimes23["Scene3"]) {
      startTime = dictTimes23["Scene3"];
      document.getElementById("text2").innerHTML = "Their profile match 13%";
      document.getElementById("text1").style.alignItems = "flex-end";
      document.getElementById("text2").style.textAlign = "right";

      lerpAnimation(
        camera,
        new THREE.Vector3(-80, 0, 90),
        elapsedTime,
        startTime,
        startTime + cameramovementdelay
      );

      lerpAnimation(
        scene.getObjectByName("face-leftface2/"),
        new THREE.Vector3(-2, 0, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface2/"),
        new THREE.Vector3(11, 0, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-left-chinface2/").visible = false;
      scene.getObjectByName("face-right-chinface2/").visible = false;

      scene.getObjectByName("face-left-profileface2/").visible = true;
      scene.getObjectByName("face-right-profileface2/").visible = true;

      lerpAnimation(
        scene.getObjectByName("face-left-profileface2/"),
        scene.getObjectByName("face-leftface2/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-right-profileface2/"),
        scene.getObjectByName("face-rightface2/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
    }
    // -------------------- Scene 4
    if (elapsedTime > dictTimes23["Scene4"]) {
      startTime = dictTimes23["Scene4"];
      lerpAnimation(
        camera,
        new THREE.Vector3(20, 0, 80),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-left-profileface2/").visible = false;
      scene.getObjectByName("face-right-profileface2/").visible = false;

      lerpAnimation(
        scene.getObjectByName("face-leftface2/"),
        new THREE.Vector3(-10, 0.8, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface2/"),
        new THREE.Vector3(8, 0.8, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-leftface2/").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });
      scene.getObjectByName("face-rightface2/").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });      
      

      document.getElementById("text1").style.padding ="148px 226px 148px 226px";
      document.getElementById("text2").style.maxWidth = "1467px";
      document.getElementById("text2").style.fontSize = "180px";
      document.getElementById("text2").style.textAlign = "center";
      document.getElementById("text2").style.maxWidth = "1258px";
      document.getElementById("text2").innerHTML ="This would <u>not</u> be identified as a match.";
      document.getElementById("text3").innerHTML = "";
    }
    
    if (elapsedTime > dictTimes23["Scene5"]) {
      window.location.href = window.location.href.split("/")[0] + '/compare-face2.html'
    }
  }

  // SCRIPT FOR HISTORY 3 ------------------------------------------------------------------------------------------
  if (tmp[tmp.length - 1] == "history3.html") {
    document.getElementById("background-history-id").style.opacity = 1

    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id")
      scene.getObjectByName("face-rightface3/").visible = true;
      scene.getObjectByName("face-leftface3/").visible = true;
      scene.getObjectByName("face-rightface3/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface3/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-chinface3/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-chinface3/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-profileface3/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-profileface3/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
  
    }
    // -------------------- Scene 1
    if (elapsedTime > dictTimes23["Scene1"]) {
      startTime = dictTimes23["Scene1"];
      scene
        .getObjectByName("face-leftface3/")
        .position.copy(new THREE.Vector3(-2, -3, 0));
      scene
        .getObjectByName("face-rightface3/")
        .position.copy(new THREE.Vector3(11, -3, 0));
    }

    // -------------------- Scene 2
    if (elapsedTime > dictTimes23["Scene2"]) {
      startTime = dictTimes23["Scene2"];
      document.getElementById("text2").innerHTML = "The arch of their chin is a 98% match";
      lerpAnimation(
        camera,
        new THREE.Vector3(90, -20, 100),
        elapsedTime,
        startTime,
        startTime + cameramovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-leftface3/"),
        new THREE.Vector3(-2, 0.8, -5),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface3/"),
        new THREE.Vector3(11, 0.8, -5),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-left-chinface3/").visible = true;
      lerpAnimation(
        scene.getObjectByName("face-left-chinface3/"),
        scene.getObjectByName("face-leftface3/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-right-chinface3/").visible = true;
      lerpAnimation(
        scene.getObjectByName("face-right-chinface3/"),
        scene.getObjectByName("face-rightface3/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
    }
    // -------------------- Scene 3
    if (elapsedTime > dictTimes23["Scene3"]) {
      startTime = dictTimes23["Scene3"];
      document.getElementById("text2").innerHTML = "Their profile match 95%";
      document.getElementById("text1").style.alignItems = "flex-end";
      document.getElementById("text2").style.textAlign = "right";

      lerpAnimation(
        camera,
        new THREE.Vector3(-80, 0, 90),
        elapsedTime,
        startTime,
        startTime + cameramovementdelay
      );

      lerpAnimation(
        scene.getObjectByName("face-leftface3/"),
        new THREE.Vector3(-2, 0, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface3/"),
        new THREE.Vector3(11, 0, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-left-chinface3/").visible = false;
      scene.getObjectByName("face-right-chinface3/").visible = false;

      scene.getObjectByName("face-left-profileface3/").visible = true;
      scene.getObjectByName("face-right-profileface3/").visible = true;

      lerpAnimation(
        scene.getObjectByName("face-left-profileface3/"),
        scene.getObjectByName("face-leftface3/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-right-profileface3/"),
        scene.getObjectByName("face-rightface3/").position,
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
    }
    // -------------------- Scene 4
    if (elapsedTime > dictTimes23["Scene4"]) {
      startTime = dictTimes23["Scene4"];

      lerpAnimation(
        camera,
        new THREE.Vector3(20, 0, 80),
        elapsedTime,
        startTime,
        startTime + cameramovementdelay
      );

      scene.getObjectByName("face-left-profileface3/").visible = false;
      scene.getObjectByName("face-right-profileface3/").visible = false;

      lerpAnimation(
        scene.getObjectByName("face-leftface3/"),
        new THREE.Vector3(-10, 0.8, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );
      lerpAnimation(
        scene.getObjectByName("face-rightface3/"),
        new THREE.Vector3(8, 0.8, -15),
        elapsedTime,
        startTime,
        startTime + objectsmovementdelay
      );

      scene.getObjectByName("face-leftface3/").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });
      scene.getObjectByName("face-rightface3/").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });

      document.getElementById("text1").style.padding ="148px 226px 148px 226px";
      document.getElementById("text2").style.maxWidth = "1467px";
      document.getElementById("text2").style.fontSize = "180px";
      document.getElementById("text2").style.textAlign = "center";
      document.getElementById("text2").style.maxWidth = "1258px";
      document.getElementById("text2").innerHTML = "This would be identified as a match.";
      document.getElementById("text3").innerHTML = "";
    }
    
    if (elapsedTime > dictTimes23["Scene5"]) {
      window.location.href = window.location.href.split("/")[0] + '/compare-face3.html'
    }
  }

////////////// -----------------------------------------------------------------------------------------------------
  // SCRIPT FOR COMPARE 1 [scene 5]
  if (tmp[tmp.length - 1] == "compare-face1.html") {
    document.getElementById("background-compare-id").style.opacity = 1
    if (elapsedTime > initdelay) {
      opacityBackground("background-compare-id")
      scene.getObjectByName("face-rightface1/").visible = true;
      scene.getObjectByName("face-leftface1/").visible = true;
      scene.getObjectByName("face-rightface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface1/").position.x = -15
      scene.getObjectByName("face-leftface1/").position.y = 2
      scene.getObjectByName("face-rightface1/").position.x = 15
      scene.getObjectByName("face-rightface1/").position.y = 2
      camera.position.z = 300
    }
    if (elapsedTime > dictTimes1["Scene6"]) {
      window.location.href = window.location.href.split("/")[0] + '/explore.html'
    }
  }
  // SCRIPT FOR COMPARE 2 [scene 5]
  if (tmp[tmp.length - 1] == "compare-face2.html") {
      document.getElementById("background-compare-id").style.opacity = 1
      if (elapsedTime > initdelay) {
        opacityBackground("background-compare-id")
        scene.getObjectByName("face-rightface2/").visible = true;
        scene.getObjectByName("face-leftface2/").visible = true;
        scene.getObjectByName("face-rightface2/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face-leftface2/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face-leftface2/").position.x = -15
        scene.getObjectByName("face-leftface2/").position.y = 2
        scene.getObjectByName("face-rightface2/").position.x = 15
        scene.getObjectByName("face-rightface2/").position.y = 2
        camera.position.z = 300
      }
      if (elapsedTime > dictTimes1["Scene6"]) {
        window.location.href = window.location.href.split("/")[0] + '/explore.html'
      }
  }

  // SCRIPT FOR COMPARE 3 [scene 5]
  if (tmp[tmp.length - 1] == "compare-face3.html") {
    document.getElementById("background-compare-id").style.opacity = 1
    if (elapsedTime > initdelay) {
      opacityBackground("background-compare-id")
      scene.getObjectByName("face-rightface3/").visible = true;
      scene.getObjectByName("face-leftface3/").visible = true;
      scene.getObjectByName("face-rightface3/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface3/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface3/").position.x = -15
      scene.getObjectByName("face-leftface3/").position.y = 2
      scene.getObjectByName("face-rightface3/").position.x = 15
      scene.getObjectByName("face-rightface3/").position.y = 2
      camera.position.z = 300
    }
    if (elapsedTime > dictTimes1["Scene6"]) {
      window.location.href = window.location.href.split("/")[0] + '/explore.html'
    }
}

////////////// -----------------------------------------------------------------------------------------------------
  // SCRIPT FOR HISTORY (ALL) [scene 6]
  if (tmp[tmp.length - 1] == "explore.html") {
    document.getElementById("background-history-id").style.opacity = 1
    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id")
      scene.getObjectByName("face1-explore").visible = true
      scene.getObjectByName("face2-explore").visible = true
      scene.getObjectByName("face3-explore").visible = true

      scene.remove(scene.getObjectByName("face-left"))
      scene.remove(scene.getObjectByName("face-right"))
      scene.remove(scene.getObjectByName("face-left-chin"))
      scene.remove(scene.getObjectByName("face-right-chin"))
      scene.remove(scene.getObjectByName("face-left-profile"))
      scene.remove(scene.getObjectByName("face-right-profile"))

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('click', onClick);
    }
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
