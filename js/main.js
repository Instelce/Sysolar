// import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
//
// let scene, camera, renderer;
// const planetsContainer = document.querySelector(".planet__container")
//
// init();
//
// function init() {
//     scene = new THREE.Scene()
//     camera = new THREE.PerspectiveCamera(
//         75,
//         planetsContainer.offsetWidth / planetsContainer.offsetHeight,
//         0.1,
//         1000
//     )
//     renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         canvas: document.querySelector("#earth")
//     })
//     renderer.setSize(planetsContainer.offsetWidth, planetsContainer.offsetHeight)
//     renderer.setPixelRatio(window.devicePixelRatio)
//
//     const earth = new THREE.Mesh(
//         new THREE.SphereGeometry(5, 50, 50),
//         new THREE.MeshBasicMaterial()
//     )
//     scene.add(earth)
// }