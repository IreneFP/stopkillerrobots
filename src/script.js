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

// LEFT FACE
gltfLoader.load("/models/faces11.glb", (gltf) => {
  // gltf.scene.scale.set(9, 9, 9) // face 1
  gltf.scene.scale.set(7.5, 7.5, 7.5); // face 2
  // gltf.scene.scale.set(10, 10, 10) // face 3

  gltf.scene.position.set(-7, -1, 0);
  gltf.scene.name = "face-left";
  // gltf.scene.children[0].material.opacity = 0;
  // gltf.scene.children[0].material.transparent = true;
  scene.add(gltf.scene);
});

gltfLoader.load("/models/faces21 - lineprofile.glb", (gltf) => {
  gltf.scene.scale.set(7.5, 7.5, 7.5);
  gltf.scene.name = "face-left-profile";
  gltf.scene.visible = false;
  scene.add(gltf.scene);
});

gltfLoader.load("/models/faces21 - linechin.glb", (gltf) => {
  gltf.scene.scale.set(7.5, 7.5, 7.5);
  gltf.scene.name = "face-left-chin";
  gltf.scene.visible = false;
  scene.add(gltf.scene);
});

// RIGHT FACE
gltfLoader.load("/models/faces12.glb", (gltf) => {
  // gltf.scene.scale.set(9, 9, 9) // face 1
  gltf.scene.scale.set(7, 7, 7); //face 2
  // gltf.scene.scale.set(10, 10, 10) // face 3

  gltf.scene.position.set(7, -1, 0);
  gltf.scene.name = "face-right";
  // gltf.scene.children[0].material.opacity = 0;
  // gltf.scene.children[0].material.transparent = true;
  scene.add(gltf.scene);
});

gltfLoader.load("/models/faces22 - linechin.glb", (gltf) => {
  gltf.scene.scale.set(7, 7, 7);
  gltf.scene.name = "face-right-chin";
  gltf.scene.visible = false;
  scene.add(gltf.scene);
});

gltfLoader.load("/models/faces22 - lineprofile.glb", (gltf) => {
  gltf.scene.scale.set(7, 7, 7);
  gltf.scene.name = "face-right-profile";
  gltf.scene.visible = false;
  scene.add(gltf.scene);
});

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
// controls.enableDamping = true

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
// ANIMATION
//

var dictTimes = {
  Scene1: 1,
  Scene11: 4,
  Scene12: 8,
  Scene2: 12,
  Scene3: 17,
  Scene31: 22,
  Scene4: 30,
  Scene5: 40,
  Scene6: 10,
};

  // var dictTimes = {
  //   "Scene1":     1,
  //   "Scene11":    1,
  //   "Scene12":    1,
  //   "Scene2":     1,
  //   "Scene3":     1,
  //   "Scene31":    1,
  //   "Scene4":     1,
  //   "Scene5":     5,
  //   "Scene6":     50,
  // };
// -----------------------------------------------------------------------------------
// PROGRESS BAR
//
const url = window.location.href.split("/")
if (url[url.length - 1] == "history.html") {
    var bar = new ProgressBar.Line(container, {
        strokeWidth: 0.5,
        easing: "easeInOut",
        duration: 30000, // seconds * 1000
        color: "yellow",
        trailColor: "white",
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
// TICK
//

let alpha = 1
let startTime = 0;
const clock = new THREE.Clock();

const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime)
  // Update object
  const tmp = window.location.href.split("/");
  const delay = 0.6;
  const rangeMovement = 0.2;
  
  if (elapsedTime > 2) {
    scene.getObjectByName("face-right").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
    scene.getObjectByName("face-left").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
    scene.getObjectByName("face-left-chin").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
    scene.getObjectByName("face-right-chin").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
    scene.getObjectByName("face-left-profile").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
    scene.getObjectByName("face-right-profile").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;

  }
  if (tmp[tmp.length - 1] == "") {
    document.getElementById("background-history-id").style.opacity = 1
    if (elapsedTime > 2) {
      opacityBackground("background-history-id")
    }
  }

  // Script for History
  if (tmp[tmp.length - 1] == "history.html") {
    document.getElementById("background-history-id").style.opacity = 1
    if (elapsedTime > 2) {
      opacityBackground("background-history-id")
    }
    // -------------------- Scene 1
    if (elapsedTime > dictTimes["Scene1"]) {
      startTime = dictTimes["Scene1"];
      scene
        .getObjectByName("face-left")
        .position.copy(new THREE.Vector3(-2, -3, 0));
      scene
        .getObjectByName("face-right")
        .position.copy(new THREE.Vector3(11, -3, 0));
    }
    // -------------------- Scene 1.1
    if (elapsedTime > dictTimes["Scene11"]) {
      startTime = dictTimes["Scene11"];
      document.getElementById("text2").innerHTML =
        "How does your brain recognize faces?";
    }
    // -------------------- Scene 1.2
    if (elapsedTime > dictTimes["Scene12"]) {
      startTime = dictTimes["Scene12"];
      document.getElementById("text2").innerHTML =
        "How do you know you’ve seen a friend across the road, or spot your child at school?";
    }
    // -------------------- Scene 2
    if (elapsedTime > dictTimes["Scene2"]) {
      startTime = dictTimes["Scene2"];
      document.getElementById("text2").innerHTML =
        "Is it by the arch of the chin?";
      lerpAnimation(
        camera,
        new THREE.Vector3(90, -20, 100),
        elapsedTime,
        startTime,
        startTime + 2
      );
      lerpAnimation(
        scene.getObjectByName("face-left"),
        new THREE.Vector3(-2, 0.8, -5),
        elapsedTime,
        startTime,
        startTime + 2
      );
      lerpAnimation(
        scene.getObjectByName("face-right"),
        new THREE.Vector3(11, 0.8, -5),
        elapsedTime,
        startTime,
        startTime + 2
      );

      scene.getObjectByName("face-left-chin").visible = true;
      lerpAnimation(
        scene.getObjectByName("face-left-chin"),
        scene.getObjectByName("face-left").position,
        elapsedTime,
        startTime,
        startTime + 2
      );

      scene.getObjectByName("face-right-chin").visible = true;
      lerpAnimation(
        scene.getObjectByName("face-right-chin"),
        scene.getObjectByName("face-right").position,
        elapsedTime,
        startTime,
        startTime + 2
      );
    }
    // -------------------- Scene 3
    if (elapsedTime > dictTimes["Scene3"]) {
      startTime = dictTimes["Scene3"];
      document.getElementById("text2").innerHTML =
        "Or is it by the shape of the nose?";
      document.getElementById("text1").style.alignItems = "flex-end";
      document.getElementById("text2").style.textAlign = "right";

      lerpAnimation(
        camera,
        new THREE.Vector3(-80, 0, 90),
        elapsedTime,
        startTime,
        startTime + 2
      );

      lerpAnimation(
        scene.getObjectByName("face-left"),
        new THREE.Vector3(-2, 0, -15),
        elapsedTime,
        startTime,
        startTime + 2
      );
      lerpAnimation(
        scene.getObjectByName("face-right"),
        new THREE.Vector3(11, 0, -15),
        elapsedTime,
        startTime,
        startTime + 2
      );

      scene.getObjectByName("face-left-chin").visible = false;
      scene.getObjectByName("face-right-chin").visible = false;

      scene.getObjectByName("face-left-profile").visible = true;
      scene.getObjectByName("face-right-profile").visible = true;

      lerpAnimation(
        scene.getObjectByName("face-left-profile"),
        scene.getObjectByName("face-left").position,
        elapsedTime,
        startTime,
        startTime + 2
      );
      lerpAnimation(
        scene.getObjectByName("face-right-profile"),
        scene.getObjectByName("face-right").position,
        elapsedTime,
        startTime,
        startTime + 2
      );
    }
    // -------------------- Scene 3.1
    if (elapsedTime > dictTimes["Scene31"]) {
      startTime = dictTimes["Scene31"];
      lerpAnimation(
        camera,
        new THREE.Vector3(20, 0, 80),
        elapsedTime,
        startTime,
        startTime + 2
      );

      scene.getObjectByName("face-left-profile").visible = false;
      scene.getObjectByName("face-right-profile").visible = false;

      lerpAnimation(
        scene.getObjectByName("face-left"),
        new THREE.Vector3(-10, 0.8, -15),
        elapsedTime,
        startTime,
        startTime + 2
      );
      lerpAnimation(
        scene.getObjectByName("face-right"),
        new THREE.Vector3(8, 0.8, -15),
        elapsedTime,
        startTime,
        startTime + 2
      );

      scene.getObjectByName("face-left").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });
      scene.getObjectByName("face-right").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });

      document.getElementById("text1").style.alignItems = "flex-start";
      document.getElementById("text1").style.padding =
        "200px 331px 400px 331px";
      document.getElementById("text2").style.textAlign = "center";
      document.getElementById("text2").style.maxWidth = "1258px";
      document.getElementById("text2").innerHTML =
        "Facial recognition technology takes your face and transforms it into data points.";
      document.getElementById("text3").innerHTML =
        "The algorithm compares the data points and determines if there is a match";
    }
    // -------------------- Scene 4
    if (elapsedTime > dictTimes["Scene4"]) {
      startTime = dictTimes["Scene4"];
      document.getElementById("text1").style.padding =
        "148px 226px 148px 226px";

      document.getElementById("text2").style.maxWidth = "1467px";
      document.getElementById("text2").style.fontSize = "180px";
      document.getElementById("text2").innerHTML =
        "These faces have a match percentage of 98%";
      document.getElementById("text3").innerHTML = "";
    }
    
    if (elapsedTime > dictTimes["Scene5"]) {
      window.location.href = window.location.href.split("/")[0] + '/compare-face2.html'
      // document.getElementById("background-compare-id").style.opacity = 1

    }
  }
    // -------------------- Scene 5
    if (tmp[tmp.length - 1] == "compare-face2.html") {
      document.getElementById("background-compare-id").style.opacity = 1
      if (elapsedTime > 1) {
        opacityBackground("background-compare-id")
        scene.getObjectByName("face-left").position.x = 15
        scene.getObjectByName("face-left").position.y = 2
        scene.getObjectByName("face-right").position.x = -15
        scene.getObjectByName("face-right").position.y = 2
        camera.position.z = 300
      }


    
    }


  // -------------------- Scene 6    
  if (elapsedTime > dictTimes["Scene6"]) {
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
