import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// -----------------------------------------------------------------------------------
// TEXT LOAD
//

var WebFont = require('webfontloader');
 
WebFont.load({
  google: {
    families: ['Droid Sans', 'Droid Serif', 'Inria Sans', 'Raleway']
  }
});


// setTimeout(function() {
//     // document.getElementById('element').innerHTML += '<br>More text';
//     // document.getElementsByClassName('how-does-your-brain-recognize').innerHTML += 'MORE'
//     console.log(document.getElementsByClassName('how-does-your-brain-recognize').innerHTML)
// }, 1000);


// -----------------------------------------------------------------------------------

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()

/**
 * Base
 */
// Debug
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0x000000);

const axeshelper = new THREE.AxesHelper
// scene.add(axeshelper)

// LEFT FACE
gltfLoader.load(
    '/models/faces11.glb',
    (gltf) =>
    {
        // gltf.scene.scale.set(10, 10, 10) // face 3
        gltf.scene.scale.set(9, 9, 9) 
        gltf.scene.position.set(-2, -3, 0)
        // gltf.scene.position.set(8, -2, 0)
        gltf.scene.name = 'face-left'

        scene.add(gltf.scene)
        
    }
)

// RIGHT FACE
gltfLoader.load(
    '/models/faces12.glb',
    (gltf) =>
    {
        // gltf.scene.scale.set(10, 10, 10) 
        gltf.scene.scale.set(9, 9, 9) // face 3
        gltf.scene.position.set(11, -3, 0)
        // gltf.scene.position.set(-8, -2, 0)
        gltf.scene.name = 'face-right'
        
        scene.add(gltf.scene)
    }
)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 1
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 1, 2.25)
scene.add(directionalLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(7, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 4, 160)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0xffffff, 0) // uncomment for white background


/**
 * Animate
 */

const clock = new THREE.Clock()

var testPhase2 = false;
const tick = () =>
{
    // Clock   
    const elapsedTime = clock.getElapsedTime()
    
    // Update object
    // console.log(scene.getObjectByName('face-left'))
    scene.children.forEach((element) => {
        const delay = 0.6
        const rangeMovement = 0.2
        if (element.type === "Group") {
          element.rotation.y = Math.sin(elapsedTime * delay) * rangeMovement;
        }

        // Scene 1.1
        if (elapsedTime > 0 && !testPhase2) {
            document.getElementById('text2').innerHTML = "How does your brain recognize faces?"
            testPhase2 = true    
        }
        // Scene 1.2
        if (elapsedTime > 2) {
            document.getElementById('text2').innerHTML = "How do you know you’ve seen a friend across the road, or spot your child at school?"
        }
        // Scene 2
        if (elapsedTime > 4) {
            document.getElementById('text2').innerHTML = "Is it by the arch of the chin?"
            camera.position.x = 90
            camera.position.y = -20
            camera.position.z = 100
            scene.getObjectByName('face-left').position.y = 0.8
            scene.getObjectByName('face-right').position.y = 0.8
            scene.getObjectByName('face-left').position.z = -5
            scene.getObjectByName('face-right').position.z = -5
        }
        // Scene 3
        if (elapsedTime > 8) {
            document.getElementById('text2').innerHTML = "Or is it by the shape of the nose?"
            camera.position.x = -120
            camera.position.y = 0
            camera.position.z = 50
            scene.getObjectByName('face-left').position.z = -15
            scene.getObjectByName('face-right').position.z = -15
            document.getElementById('text1').style.alignItems = "flex-end"
            document.getElementById('text2').style.textAlign = "right"            
        }
        // Scene 3.2
        if (elapsedTime > 10) {
            camera.position.x = 20
            camera.position.y = 0
            camera.position.z = 80
            scene.getObjectByName('face-left').position.x = -10
            scene.getObjectByName('face-right').position.x = 8
            if (element.type === "Group") {
                element.traverse((node) => {
                    if (!node.isMesh) return;
                    node.material.wireframe = true;
                  });
            }
            document.getElementById('text1').style.alignItems = "flex-start"
            document.getElementById('text1').style.padding = "200px 331px 318px 331px"
            document.getElementById('text2').style.textAlign = "center" 
            document.getElementById('text2').style.maxWidth = "1258px"
            document.getElementById('text2').innerHTML = "Facial recognition technology takes your face and transforms it into data points."
            document.getElementById('text3').innerHTML = "The algorithm compares the data points and determines if there is a match"
    }
        // Scene 4
        if (elapsedTime > 12) {
            camera.position.x = 20
            camera.position.y = 0
            camera.position.z = 80
            scene.getObjectByName('face-left').position.x = -10
            scene.getObjectByName('face-right').position.x = 8
            if (element.type === "Group") {
                element.traverse((node) => {
                    if (!node.isMesh) return;
                    node.material.wireframe = true;
                  });
            }
            document.getElementById('text1').style.alignItems = "flex-start"
            document.getElementById('text1').style.padding = "148px 226px 148px 226px"
            document.getElementById('text2').style.textAlign = "center" 
            document.getElementById('text2').style.maxWidth = "1467px"
            document.getElementById('text2').style.fontSize = "180px"
            document.getElementById('text2').innerHTML = "These faces have a match percentage of 98%"
            document.getElementById('text3').innerHTML = ""
    }






    // ----------- BAD
    //     if (elapsedTime > 5) {
    //         camera.position.x = 140
    //         camera.position.y = -20
    //         camera.position.z = 80
    //         // if (element.type === "Group") {
    //         //     element.position.x += 1
    //         // }
            
    //     }
    //     if (elapsedTime > 2 && !testPhase2) {
    //         camera.position.x = -120
    //         camera.position.y = 0
    //         camera.position.z = 50
    //         // if (element.type === "Group") {
    //         //     element.position.x += 1
    //         // }
    //         document.getElementById('text1').innerHTML = "hi"
    //         console.log(document.getElementById('text1'))
    //         document.getElementById('text1').classList.add('new-position-phase-2')
    //         document.getElementById('main-canvas').classList.add('opacity-zero')

    //         testPhase2 = true
    //     }

        // if (elapsedTime > 6) {
        //     document.getElementById('main-canvas').classList.remove('opacity-zero')
        //     document.getElementById('main-canvas').classList.remove('opacity-one')
        //     camera.position.x = 20
        //     camera.position.y = 0
        //     camera.position.z = 100
        //     if (element.type === "Group") {
        //         element.traverse((node) => {
        //             if (!node.isMesh) return;
        //             node.material.wireframe = true;
        //           });
        //     }
        // }
      });

    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
