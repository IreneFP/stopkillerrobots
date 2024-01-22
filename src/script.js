import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import ProgressBar from "progressbar.js";
import { lerp } from "three/src/math/MathUtils";
// import { WireframeGeometry2 } from 'three/examples/jsm/WireframeGeometry2.js'; /// I HAVE IMPORTED THIS BUT I HAVE NOT INSTALLED IT!

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
var manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log(
    "Started loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};

manager.onLoad = function () {
  console.log("Loading complete!");
  tick();
  // This is where the loading of all your files is completed!
  // You should call your function to start interacting with the scene from here :)
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log(
    "Loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};

manager.onError = function (url) {
  console.log("There was an error loading " + url);
};
const gltfLoader = new GLTFLoader(manager);

/**
 * Base
 */
// Debug
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
var scene = new THREE.Scene();
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
controls.enableDamping = false;

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

const folder_name = ["face1/", "face2/", "face3/"];
const faceSizes = {
  "face1/": [9, 9],
  "face2/": [7.5, 6.8],
  "face3/": [9, 7.5],
};

folder_name.forEach((facename) => {
  // LEFT FACE ----
  gltfLoader.load("../models/" + facename + "1-face.glb", (gltf) => {
    gltf.scene.scale.set(
      faceSizes[facename][0],
      faceSizes[facename][0],
      faceSizes[facename][0]
    );
    gltf.scene.position.set(-7, -1, 0);
    gltf.scene.name = "face-left" + facename;
    gltf.scene.visible = false;
    scene.add(gltf.scene);
  });

  gltfLoader.load("../models/" + facename + "1-linechin.glb", (gltf) => {
    gltf.scene.scale.set(
      faceSizes[facename][0],
      faceSizes[facename][0],
      faceSizes[facename][0]
    );
    gltf.scene.position.set(-2, 0.8, -5);
    gltf.scene.name = "face-left-chin" + facename;
    gltf.scene.visible = false;
    scene.add(gltf.scene);
  });

  gltfLoader.load("../models/" + facename + "1-lineprofile.glb", (gltf) => {
    gltf.scene.scale.set(
      faceSizes[facename][0],
      faceSizes[facename][0],
      faceSizes[facename][0]
    );
    gltf.scene.position.set(-2, 0, -15);
    gltf.scene.name = "face-left-profile" + facename;
    gltf.scene.visible = false;
    scene.add(gltf.scene);
  });

  // RIGHT FACE ----
  gltfLoader.load("../models/" + facename + "2-face.glb", (gltf) => {
    gltf.scene.scale.set(
      faceSizes[facename][1],
      faceSizes[facename][1],
      faceSizes[facename][1]
    );
    gltf.scene.position.set(7, -1, 0);
    gltf.scene.name = "face-right" + facename;
    gltf.scene.visible = false;
    scene.add(gltf.scene);
  });

  gltfLoader.load("../models/" + facename + "2-linechin.glb", (gltf) => {
    gltf.scene.scale.set(
      faceSizes[facename][1],
      faceSizes[facename][1],
      faceSizes[facename][1]
    );
    gltf.scene.position.set(11, 0.8, -5);
    gltf.scene.name = "face-right-chin" + facename;
    gltf.scene.visible = false;
    scene.add(gltf.scene);
  });

  gltfLoader.load("../models/" + facename + "2-lineprofile.glb", (gltf) => {
    gltf.scene.scale.set(
      faceSizes[facename][1],
      faceSizes[facename][1],
      faceSizes[facename][1]
    );
    gltf.scene.position.set(11, 0, -15);
    gltf.scene.name = "face-right-profile" + facename;
    gltf.scene.visible = false;
    scene.add(gltf.scene);
  });
});

// FOR EXPLORE

gltfLoader.load("../models/face1/1-face.glb", (gltf) => {
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(-10, -1, 0);
  gltf.scene.name = "face1-explore";
  gltf.scene.visible = false;
  scene.add(gltf.scene);
});

gltfLoader.load("../models//face2/1-face.glb", (gltf) => {
  gltf.scene.scale.set(4.5, 4.5, 4.5);
  gltf.scene.position.set(-6, -1, 0);
  gltf.scene.name = "face2-explore";
  gltf.scene.visible = false;
  scene.add(gltf.scene);
});

gltfLoader.load("../models/face3/1-face.glb", (gltf) => {
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.position.set(6, -1, 0);
  gltf.scene.name = "face3-explore";
  gltf.scene.visible = false;

  scene.add(gltf.scene);
});

// -----------------------------------------------------------------------------------
// ANIMATION
//

const initdelay = 0; //seconds // will depend on Lateny

var dictTimes1 = {
  Scene1: initdelay,
  Scene11: 8,
  Scene12: 16,
  Scene2: 24,
  Scene3: 30,
  Scene31: 36,
  Scene4: 51,
  Scene5: 60,
  Scene6: 13,
  Scene61: 5, //5
  Scene62: 10, //10
  Scene7: 25, //15,
  Scene8: 40, //25,
  Scene9: 73, //40,
  Scene10: 83, //50,
};

var dictTimes23 = {
  Scene1: initdelay,
  Scene2: 8,
  Scene3: 18,
  Scene4: 28,
  Scene5: 38,
};

// var dictTimes23 = {
//   Scene1: initdelay,
//   Scene2: 2,
//   Scene3: 2,
//   Scene4: 2,
//   Scene5: 30000,
// };

// -----------------------------------------------------------------------------------
// PROGRESS BAR
//
const url = window.location.href.split("/");
let max_duration = 0;
if (
  url[url.length - 1] == "history1.html" ||
  url[url.length - 1] == "history2.html" ||
  url[url.length - 1] == "history3.html"
) {
  max_duration = dictTimes1["Scene5"];
} else if (url[url.length - 1] == "final.html") {
  max_duration = dictTimes1["Scene10"];
} else {
  max_duration = dictTimes23["Scene5"];
}

if (
  url[url.length - 1] == "history1.html" ||
  url[url.length - 1] == "history2.html" ||
  url[url.length - 1] == "history3.html" ||
  url[url.length - 1] == "final.html"
) {
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

function opacityBackground(id) {
  if (alpha > 0) {
    document.getElementById(id).style.opacity = alpha;
    alpha -= 0.01;
  } else {
    document.getElementById(id).style.opacity = 0;
  }
}

function getwireframe(object) {
  scene.getObjectByName(object).traverse((node) => {
    if (!node.isMesh) return;
    node.material.wireframe = true;
  });
}

// -----------------------------------------------------------------------------------
// RAYCASTER
//

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var target = new THREE.Vector3();

const onMouseMove = (event, elapsedTime) => {
  pointer.x =
    (event.clientX / document.getElementById("main-canvas").width) * 2 - 1;
  pointer.y =
    -(event.clientY / document.getElementById("main-canvas").height) * 2 + 1;
  pointer.z = 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    console.log(intersects[0].object.parent.name);
    target.x += pointer.x - target.x;
    target.y += pointer.y - target.y;
    target.y -= 1;
    target.z = 3;
    if (intersects[0].object.parent.name == "face3-explore") {
      target.x += 9.5;
      intersects[0].object.lookAt(target);
    } else if (intersects[0].object.parent.name == "face1-explore") {
      target.x -= 9.5;
      intersects[0].object.lookAt(target);
    } else {
      intersects[0].object.lookAt(target);
    }
    // console.log(intersects[0].object.parent.name)
    // console.log(scene.getObjectByName(intersects[0].object.parent.name))
    // target.x += ( pointer.x - target.x ) * 2;
    // target.y += ( - pointer.y - target.y ) * 2 ;
    // scene.getObjectByName(intersects[0].object.parent.name).lookAt = target
  }

  // if (intersects.length > 0) {
  //   target.x += ( pointer.x - target.x ) * 2;
  //   target.y += ( - pointer.y - target.y ) * 2 ;
  //   target.z = camera.position.z;
  //   intersects[0].object.lookAt(target)

  // scene.getObjectByName("face-left-chinface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;

  // target.x += pointer.x - target.x;
  // target.y += pointer.y - target.y;
  // target.z = 1;
  // console.log(target);
  // scene.getObjectByName("face1-explore").lookAt(target);
  // scene.getObjectByName("face2-explore").lookAt(target);
  // scene.getObjectByName("face3-explore").lookAt(target);

  // }
};

let i = 0;
let URL = window.location.href.split("/").slice(0, -1).join("/");

function onClick(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  while (i < intersects.length) {
    if (intersects[i].object.parent.name === "face1-explore") {
      window.open(URL + "/history1.html", "_self");
    }
    if (intersects[i].object.parent.name === "face2-explore") {
      window.open(URL + "/history2.html", "_self");
    }
    if (intersects[i].object.parent.name === "face3-explore") {
      window.open(URL + "/history3.html", "_self");
    }
    i++;
  }
  i = 0;
}

// -----------------------------------------------------------------------------------
// TICK FUNCTION
//
var bouncingfont1 = 1;
var bouncingfont2 = 1;
var bouncingfont3 = 1;

var rectopacity = 0;
const cameramovementdelay = 4;
const objectsmovementdelay = 2;
let alpha = 1;
let startTime = 0;
const clock = new THREE.Clock();

const tick = () => {
  //  console.log("The first tick will appear only after the all objects are loaded :) ");
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update object
  const tmp = window.location.href.split("/");
  const delay = 0.6;
  const rangeMovement = 0.2;

  if (tmp[tmp.length - 1] == "" || tmp[tmp.length - 1] == "index.html") {
    document.getElementById("background-history-id").style.opacity = 1;
    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id");
      scene.getObjectByName("face-rightface1/").visible = true;
      scene.getObjectByName("face-leftface1/").visible = true;

      scene.getObjectByName("face-rightface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
    }
  }

  ////////////// -----------------------------------------------------------------------------------------------------

  // SCRIPT FOR HISTORY 1 ------------------------------------------------------------------------------------------
  if (tmp[tmp.length - 1] == "history1.html") {
    document.getElementById("background-history-id").style.opacity = 1;

    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id");
      scene.getObjectByName("face-rightface1/").visible = true;
      scene.getObjectByName("face-leftface1/").visible = true;
      scene.getObjectByName("face-rightface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-chinface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-chinface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-profileface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-profileface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
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
      // changetext("text2", "How does your brain recognize faces?")

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
      document.getElementById("text2").style.opacity = 0;

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

      if (elapsedTime > startTime + objectsmovementdelay) {
        scene.getObjectByName("face-left-chinface1/").visible = true;
        scene.getObjectByName("face-right-chinface1/").visible = true;
      }
      if (elapsedTime > startTime + objectsmovementdelay + 1) {
        document.getElementById("text2").style.opacity = 1;
        document.getElementById("text2").innerHTML =
          "Is it by the arch of the chin?";
      }
    }
    // -------------------- Scene 3
    if (elapsedTime > dictTimes1["Scene3"]) {
      startTime = dictTimes1["Scene3"];

      scene.getObjectByName("face-left-chinface1/").visible = false;
      scene.getObjectByName("face-right-chinface1/").visible = false;
      document.getElementById("text2").style.opacity = 0;

      lerpAnimation(
        camera,
        new THREE.Vector3(-80, 0, 90),
        elapsedTime,
        startTime,
        startTime + 2
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

      if (elapsedTime > startTime + objectsmovementdelay) {
        scene.getObjectByName("face-left-profileface1/").visible = true;
        scene.getObjectByName("face-right-profileface1/").visible = true;
      }
      if (elapsedTime > startTime + objectsmovementdelay + 1) {
        document.getElementById("text2").style.opacity = 1;
        document.getElementById("text2").innerHTML =
          "Or is it by the shape of the nose?";
        document.getElementById("text1").style.alignItems = "flex-end";
        document.getElementById("text2").style.textAlign = "right";
      }
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
      document.getElementById("text1").style.padding =
        "200px 331px 400px 331px";
      document.getElementById("text2").style.textAlign = "center";
      document.getElementById("text2").style.maxWidth = "1258px";
      document.getElementById("text2").innerHTML =
        "Facial recognition technology takes your face and transforms it into data points. The algorithm compares the data points and determines if there is a match.";
    }
    // -------------------- Scene 4
    if (elapsedTime > dictTimes1["Scene4"]) {
      startTime = dictTimes1["Scene4"];

      document.getElementById("text1").style.padding =
        "148px 226px 148px 226px"; // change to make it responsive
      document.getElementById("text2").style.maxWidth = "1467px";
      document.getElementById("text2").style.fontSize = "5vh";
      document.getElementById("text2").innerHTML =
        "These faces have a match percentage of 98%";
      document.getElementById("text3").innerHTML = "";
    }

    if (elapsedTime > dictTimes1["Scene5"]) {
      window.location.href =
        window.location.href.split("/")[0] + "/compare-face1.html";
      // document.getElementById("background-compare-id").style.opacity = 1
    }
  }

  // SCRIPT FOR HISTORY 2 ------------------------------------------------------------------------------------------
  if (tmp[tmp.length - 1] == "history2.html") {
    document.getElementById("background-history-id").style.opacity = 1;

    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id");
      scene.getObjectByName("face-rightface2/").visible = true;
      scene.getObjectByName("face-leftface2/").visible = true;
      scene.getObjectByName("face-rightface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-chinface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-chinface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-profileface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-profileface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
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
      document.getElementById("text2").style.opacity = 0;

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

      if (elapsedTime > startTime + objectsmovementdelay) {
        scene.getObjectByName("face-left-chinface2/").visible = true;
        scene.getObjectByName("face-right-chinface2/").visible = true;
      }
      if (elapsedTime > startTime + objectsmovementdelay + 1) {
        document.getElementById("text2").style.opacity = 1;
        document.getElementById("text2").innerHTML =
          "The arch of their chin is a 20% match";
      }
    }
    // -------------------- Scene 3
    if (elapsedTime > dictTimes23["Scene3"]) {
      startTime = dictTimes23["Scene3"];

      scene.getObjectByName("face-left-chinface2/").visible = false;
      scene.getObjectByName("face-right-chinface2/").visible = false;
      document.getElementById("text2").style.opacity = 0;

      lerpAnimation(
        camera,
        new THREE.Vector3(-80, 0, 90),
        elapsedTime,
        startTime,
        startTime + 2
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

      if (elapsedTime > startTime + objectsmovementdelay) {
        scene.getObjectByName("face-left-profileface2/").visible = true;
        scene.getObjectByName("face-right-profileface2/").visible = true;
      }
      if (elapsedTime > startTime + objectsmovementdelay + 1) {
        document.getElementById("text2").style.opacity = 1;
        document.getElementById("text2").innerHTML = "Their profile match 13%";
        document.getElementById("text1").style.alignItems = "flex-end";
        document.getElementById("text2").style.textAlign = "right";
      }
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
      document.getElementById("text1").style.alignItems = "center";
      document.getElementById("text2").style.maxWidth = "1467px";
      document.getElementById("text2").style.fontSize = "5vh";
      document.getElementById("text2").style.textAlign = "center";
      document.getElementById("text2").style.maxWidth = "1258px";
      document.getElementById("text2").innerHTML =
        "This would <u>not</u> be identified as a match.";
      document.getElementById("text3").innerHTML = "";
    }

    if (elapsedTime > dictTimes23["Scene5"]) {
      window.location.href =
        window.location.href.split("/")[0] + "/compare-face2.html";
    }
  }

  // SCRIPT FOR HISTORY 3 ------------------------------------------------------------------------------------------
  if (tmp[tmp.length - 1] == "history3.html") {
    document.getElementById("background-history-id").style.opacity = 1;

    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id");
      scene.getObjectByName("face-rightface3/").visible = true;
      scene.getObjectByName("face-leftface3/").visible = true;
      scene.getObjectByName("face-rightface3/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface3/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-chinface3/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-chinface3/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-left-profileface3/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-right-profileface3/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
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
      document.getElementById("text2").style.opacity = 0;

      lerpAnimation(
        camera,
        new THREE.Vector3(90, -20, 100),
        elapsedTime,
        startTime,
        startTime + 2
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

      // scene.getObjectByName("face-left-chinface3/").visible = true;
      // lerpAnimation(
      //   scene.getObjectByName("face-left-chinface3/"),
      //   scene.getObjectByName("face-leftface3/").position,
      //   elapsedTime,
      //   startTime,
      //   startTime + objectsmovementdelay
      // );

      // scene.getObjectByName("face-right-chinface3/").visible = true;
      // lerpAnimation(
      //   scene.getObjectByName("face-right-chinface3/"),
      //   scene.getObjectByName("face-rightface3/").position,
      //   elapsedTime,
      //   startTime,
      //   startTime + objectsmovementdelay
      // );
      if (elapsedTime > startTime + objectsmovementdelay) {
        scene.getObjectByName("face-left-chinface3/").visible = true;
        scene.getObjectByName("face-right-chinface3/").visible = true;
      }
      if (elapsedTime > startTime + objectsmovementdelay + 1) {
        document.getElementById("text2").style.opacity = 1;
        document.getElementById("text2").innerHTML =
          "The arch of their chin is a 98% match";
      }
    }
    // -------------------- Scene 3
    if (elapsedTime > dictTimes23["Scene3"]) {
      startTime = dictTimes23["Scene3"];
      document.getElementById("text2").style.opacity = 0;
      scene.getObjectByName("face-left-chinface3/").visible = false;
      scene.getObjectByName("face-right-chinface3/").visible = false;

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

      if (elapsedTime > startTime + objectsmovementdelay) {
        scene.getObjectByName("face-left-profileface3/").visible = true;
        scene.getObjectByName("face-right-profileface3/").visible = true;
      }
      if (elapsedTime > startTime + objectsmovementdelay + 1) {
        document.getElementById("text2").style.opacity = 1;
        document.getElementById("text2").style.paddingTop = "5%";
        document.getElementById("text2").innerHTML = "Their profile match 95%";
        document.getElementById("text1").style.alignItems = "flex-end";
        document.getElementById("text2").style.textAlign = "right";
      }
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

      document.getElementById("text1").style.alignItems = "center";
      document.getElementById("text2").style.maxWidth = "1467px";
      document.getElementById("text2").style.fontSize = "5vh";
      document.getElementById("text2").style.textAlign = "center";
      document.getElementById("text2").style.maxWidth = "1258px";
      document.getElementById("text2").innerHTML =
        "This would be identified as a match.";
      document.getElementById("text3").innerHTML = "";
    }

    if (elapsedTime > dictTimes23["Scene5"]) {
      window.location.href =
        window.location.href.split("/")[0] + "/compare-face3.html";
    }
  }

  ////////////// -----------------------------------------------------------------------------------------------------
  // SCRIPT FOR COMPARE 1 [scene 5]
  if (tmp[tmp.length - 1] == "compare-face1.html") {
    document.getElementById("background-compare-id").style.opacity = 1;
    if (elapsedTime > initdelay) {
      //uncomment to add in fade for faces
      //opacityBackground("background-compare-id");
      document.getElementById("background-compare-id").style.opacity = 0;

      scene.getObjectByName("face-rightface1/").visible = true;
      scene.getObjectByName("face-leftface1/").visible = true;
      scene.getObjectByName("face-rightface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface1/").position.x = -15;
      scene.getObjectByName("face-leftface1/").position.y = 2;
      scene.getObjectByName("face-rightface1/").position.x = 15;
      scene.getObjectByName("face-rightface1/").position.y = 2;
      camera.position.z = 300;
    }
    if (elapsedTime > dictTimes1["Scene6"]) {
      window.location.href = window.location.href.split("/")[0] + "/final.html";
    }
  }

  // SCRIPT FOR COMPARE 2 [scene 5]
  if (tmp[tmp.length - 1] == "compare-face2.html") {
    document.getElementById("background-compare-id").style.opacity = 1;
    if (elapsedTime > initdelay) {
      //opacityBackground("background-compare-id");
      document.getElementById("background-compare-id").style.opacity = 0;
      scene.getObjectByName("face-rightface2/").visible = true;
      scene.getObjectByName("face-leftface2/").visible = true;
      scene.getObjectByName("face-rightface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface2/").position.x = -15;
      scene.getObjectByName("face-leftface2/").position.y = 2;
      scene.getObjectByName("face-rightface2/").position.x = 15;
      scene.getObjectByName("face-rightface2/").position.y = 2;
      camera.position.z = 300;
    }
    if (elapsedTime > dictTimes1["Scene6"]) {
      window.location.href =
        window.location.href.split("/")[0] + "/explore.html";
    }
  }

  // SCRIPT FOR COMPARE 3 [scene 5]
  if (tmp[tmp.length - 1] == "compare-face3.html") {
    document.getElementById("background-compare-id").style.opacity = 1;
    if (elapsedTime > initdelay) {
      //opacityBackground("background-compare-id");
      document.getElementById("background-compare-id").style.opacity = 0;
      scene.getObjectByName("face-rightface3/").visible = true;
      scene.getObjectByName("face-leftface3/").visible = true;
      scene.getObjectByName("face-rightface3/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface3/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-leftface3/").position.x = -15;
      scene.getObjectByName("face-leftface3/").position.y = 2;
      scene.getObjectByName("face-rightface3/").position.x = 15;
      scene.getObjectByName("face-rightface3/").position.y = 2;
      camera.position.z = 300;
    }
    if (elapsedTime > dictTimes1["Scene6"]) {
      window.location.href =
        window.location.href.split("/")[0] + "/explore.html";
    }
  }

  ////////////// -----------------------------------------------------------------------------------------------------
  // SCRIPT FOR EXPLORE (ALL) [scene 6]
  if (tmp[tmp.length - 1] == "explore.html") {
    document.getElementById("background-history-id").style.opacity = 1;
    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id");
      scene.getObjectByName("face1-explore").visible = false;
      scene.getObjectByName("face2-explore").visible = true;
      scene.getObjectByName("face3-explore").visible = true;

      // console.log(scene)
      scene.remove(scene.getObjectByName("face-leftface1/"));
      scene.remove(scene.getObjectByName("face-rightface1/"));
      scene.remove(scene.getObjectByName("face-left-chinface1/"));
      scene.remove(scene.getObjectByName("face-right-chinface1/"));
      scene.remove(scene.getObjectByName("face-left-profileface1/"));
      scene.remove(scene.getObjectByName("face-right-profileface1/"));

      scene.remove(scene.getObjectByName("face-leftface2/"));
      scene.remove(scene.getObjectByName("face-rightface2/"));
      scene.remove(scene.getObjectByName("face-left-chinface2/"));
      scene.remove(scene.getObjectByName("face-right-chinface2/"));
      scene.remove(scene.getObjectByName("face-left-profileface2/"));
      scene.remove(scene.getObjectByName("face-right-profileface2/"));

      scene.remove(scene.getObjectByName("face-leftface3/"));
      scene.remove(scene.getObjectByName("face-rightface3/"));
      scene.remove(scene.getObjectByName("face-left-chinface3/"));
      scene.remove(scene.getObjectByName("face-right-chinface3/"));
      scene.remove(scene.getObjectByName("face-left-profileface3/"));
      scene.remove(scene.getObjectByName("face-right-profileface3/"));

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("click", onClick);

      if (elapsedTime > initdelay + 2) {
        document.getElementById("explorebutton").style.opacity = 1;
      }
    }
  }
  ////////////// -----------------------------------------------------------------------------------------------------
  // SCRIPT FOR FINAL
  if (tmp[tmp.length - 1] == "final.html") {
    document.getElementById("background-history-id").style.opacity = 1;

    // -------------------- Scene 6
    if (elapsedTime > initdelay) {
      opacityBackground("background-history-id");
      scene.getObjectByName("face-leftface1/").visible = true;
      scene.getObjectByName("face-rightface2/").visible = true;
      scene.getObjectByName("face-leftface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-rightface1/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;
      scene.getObjectByName("face-rightface2/").rotation.y =
        Math.sin(elapsedTime * delay) * rangeMovement;

      scene.getObjectByName("face-leftface1/").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
        node.material.color.setHex(0x3c7af2);
      });

      scene.getObjectByName("face-rightface2/").traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
        node.material.color.setHex(0x3c7af2);
      });

      camera.position.copy(new THREE.Vector3(0, 4, 100));
      scene
        .getObjectByName("face-leftface1/")
        .position.copy(new THREE.Vector3(-6.5, -5, 0));
      scene
        .getObjectByName("face-rightface1/")
        .position.copy(new THREE.Vector3(6.5, -5, 0));
      scene
        .getObjectByName("face-rightface2/")
        .position.copy(new THREE.Vector3(6.5, -5, 0));

      // -------------------- Scene 6.1
      // if (
      //   elapsedTime > dictTimes1["Scene61"] &&
      //   elapsedTime < dictTimes1["Scene62"]
      // ) {
      //   document.getElementById("bluerect").style.opacity = rectopacity;
      //   document.getElementById("yellowrect").style.opacity = rectopacity;
      //   rectopacity += 0.01;
      // }
      // -------------------- Scene 6.2
      if (
        elapsedTime > dictTimes1["Scene62"] &&
        elapsedTime < dictTimes1["Scene7"]
      ) {
        document.getElementById("text-final").innerHTML =
          "Or predict that two pictures from the <u>same person</u> belong to two different people.";
        // document.getElementById("yellowrect").style.background = "#C3F23C";
        // document.getElementById("yellowrect").style.color = "black";
        // document.getElementById("yellowrect").innerHTML = "Jack";
        scene.getObjectByName("face-rightface2/").visible = false;
        scene.getObjectByName("face-rightface1/").visible = true;
        // scene.getObjectByName("face-rightface1/").rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face-rightface1/").traverse((node) => {
          if (!node.isMesh) return;
          node.material.wireframe = true;
          node.material.color.setHex(0xc3f23c);
          scene
            .getObjectByName("face-rightface1/")
            .position.copy(new THREE.Vector3(6.5, -5, 0));
        });
      }

      // -------------------- Scene 7
      if (elapsedTime > dictTimes1["Scene7"]) {
        startTime = dictTimes1["Scene7"];
        scene.getObjectByName("face-rightface2/").visible = false;

        lerpAnimation(
          camera,
          new THREE.Vector3(20, 0, 80),
          elapsedTime,
          startTime,
          startTime + cameramovementdelay
        );

        lerpAnimation(
          scene.getObjectByName("face-leftface1/"),
          new THREE.Vector3(-10, -0.8, -15),
          elapsedTime,
          startTime,
          startTime + objectsmovementdelay
        );
        lerpAnimation(
          scene.getObjectByName("face-rightface1/"),
          new THREE.Vector3(8, -0.8, -15),
          elapsedTime,
          startTime,
          startTime + objectsmovementdelay
        );
        document.getElementById("text-final").style.marginTop = "10vh";
        document.getElementById("text-final").innerHTML =
          "Why is this a problem? The biometric data can be linked to your name, school, or criminal history.<br><br>Can you think about any potential negative consequences?";

        if (document.getElementById("bluerect") != null) {
          document.getElementById("bluerect").remove();
        }
        if (document.getElementById("yellowrect") != null) {
          document.getElementById("yellowrect").remove();
        }
      }

      // -------------------- Scene 8
      if (elapsedTime > dictTimes1["Scene8"]) {
        scene.getObjectByName("face-leftface1/").visible = false;
        scene.getObjectByName("face-rightface1/").visible = false;

        document.getElementById("text-final").innerHTML =
          "What if your<br>doppelg&#228nger is on a no-fly list?";
        document.getElementById("text-final").style.marginTop = "10vh";
        // document.getElementById("text-final").style.fontSize = `${(Math.sin(elapsedTime * delay) * 25)+ 50}px`
        if (bouncingfont1 < 80) {
          document.getElementById(
            "text-final"
          ).style.fontSize = `${bouncingfont1}px`;
          bouncingfont1 += 1;
        }
      }
      if (elapsedTime > dictTimes1["Scene8"] + 10) {
        document.getElementById("text-final").style.fontSize = "6vh";
        document.getElementById("text-final").innerHTML =
          "What happens if you don’t consent to your photo being processed and it’s mislabeled in the system forever?";
        if (bouncingfont2 < 80) {
          document.getElementById(
            "text-final"
          ).style.fontSize = `${bouncingfont2}px`;
          bouncingfont2 += 1;
        }
      }
      if (elapsedTime > dictTimes1["Scene8"] + 20) {
        // document.getElementById("text-final").innerHTML = 'Or if you’re simply not Caucasian or a man? <br> <br> <font size="20"> As researchers like Joy Buolamwini discovered, <br> this technology does not work the <br> same for all and is predominantly <br> negative towards black women</font>'
        document.getElementById("text-final").innerHTML =
          "Or if you’re simply not Caucasian or a man? <br> <br> ";

        if (bouncingfont3 < 80) {
          document.getElementById(
            "text-final"
          ).style.fontSize = `${bouncingfont3}px`;
          bouncingfont3 += 1;
        }
        // const element = document.getElementById('boxes');
        if (document.getElementById("boxes") != null) {
          document.getElementById("boxes").remove();
        }

        var div = document.createElement("div");
        div.setAttribute("id", "Joy");
        div.style.textAlign = "center";
        (div.style.fontFamily = "Inria Sans"), "sans-serif";
        div.style.color = "white";
        div.style.fontSize = "30px";
        div.innerHTML =
          "As researchers like Joy Buolamwini discovered, this technology does not work <br>the same for all and is predominantly negative towards black women.";

        if (
          document.getElementById("Joy") == null &&
          elapsedTime > dictTimes1["Scene8"] + 23
        ) {
          document.body.appendChild(div);
        }
      }

      // -------------------- Scene 9
      if (elapsedTime > dictTimes1["Scene9"]) {
        startTime = dictTimes1["Scene9"];
        if (document.getElementById("Joy") != null) {
          document.getElementById("Joy").remove();
        }
        document.getElementById("text-final").style.fontSize = "6vh";
        document.getElementById("text-final").innerHTML =
          "And even if your face is “correctly” identified, you have still been reduced to numbers to be processed.<br><br> We accept these machines as factually correct when all they’re doing is using mathematical probabilities.";
        document.getElementById("text-final").style.marginTop = "10vh";
        scene.getObjectByName("face-leftface1/").visible = true;
        scene.getObjectByName("face-rightface1/").visible = true;
        scene.getObjectByName("face-rightface1/").traverse((node) => {
          if (!node.isMesh) return;
          node.material.wireframe = true;
        });

        lerpAnimation(
          camera,
          new THREE.Vector3(20, 0, 200),
          elapsedTime,
          startTime,
          startTime + 5
        );

        getwireframe("face2-explore");
        getwireframe("face-leftface2/");
        scene.getObjectByName("face2-explore").rotation.y =
          Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face-leftface2/").rotation.y =
          Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face-leftface2/").visible = true;
        scene.getObjectByName("face-rightface2/").visible = true;
        scene.getObjectByName("face2-explore").visible = true;
        scene.getObjectByName("face2-explore").scale.set(7.5, 7.5, 7.5);
        scene
          .getObjectByName("face-leftface2/")
          .position.copy(new THREE.Vector3(-15, 12.2, -15));
        scene
          .getObjectByName("face-rightface2/")
          .position.copy(new THREE.Vector3(1, 12.2, -15));
        scene
          .getObjectByName("face2-explore")
          .position.copy(new THREE.Vector3(16, 12.2, -15));

        getwireframe("face1-explore");
        scene.getObjectByName("face1-explore").rotation.y =
          Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face1-explore").visible = true;
        scene.getObjectByName("face1-explore").scale.set(9, 9, 9);
        scene
          .getObjectByName("face-leftface1/")
          .position.copy(new THREE.Vector3(8, -0.8, -15));
        scene
          .getObjectByName("face-rightface1/")
          .position.copy(new THREE.Vector3(-8, -0.8, -15));
        scene
          .getObjectByName("face1-explore")
          .position.copy(new THREE.Vector3(-24, -0.8, -15));

        getwireframe("face3-explore");
        getwireframe("face-leftface3/");
        getwireframe("face-rightface3/");
        scene.getObjectByName("face3-explore").rotation.y =
          Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face-leftface3/").rotation.y =
          Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face-rightface3/").rotation.y =
          Math.sin(elapsedTime * delay) * rangeMovement;
        scene.getObjectByName("face-leftface3/").visible = true;
        scene.getObjectByName("face-rightface3/").visible = true;
        scene.getObjectByName("face3-explore").visible = true;
        scene.getObjectByName("face3-explore").scale.set(9, 9, 9);
        scene
          .getObjectByName("face-leftface3/")
          .position.copy(new THREE.Vector3(-15, -13.8, -15));
        scene
          .getObjectByName("face-rightface3/")
          .position.copy(new THREE.Vector3(1, -13.8, -15));
        scene
          .getObjectByName("face3-explore")
          .position.copy(new THREE.Vector3(16, -13.8, -15));
      }

      // -------------------- Scene 10
      if (elapsedTime >= dictTimes1["Scene10"]) {
        window.location.href =
          window.location.href.split("/")[0] + "/explore.html";
      }
    }
  }
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
