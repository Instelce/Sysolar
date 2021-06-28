import './css/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const planetsContainer = document.querySelector(".planet")


const planets = ['earth', 'mars']


planets.forEach(planet => {

});


// For earth
import earthVertexShader from './shaders/earth/vertex.glsl';
import earthFragmentShader from './shaders/earth/fragment.glsl';

const earthCanvas = document.getElementById('earth')
const earthScene = new THREE.Scene()
const earthCamera = new THREE.PerspectiveCamera(75, planetsContainer.offsetWidth / planetsContainer.offsetHeight, 0.1, 1000)
const earthRenderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: earthCanvas,
    alpha: true
})
earthRenderer.setSize(planetsContainer.offsetWidth, planetsContainer.offsetHeight)
earthRenderer.setPixelRatio(window.devicePixelRatio)

// For mars
import marsVertexShader from './shaders/mars/vertex.glsl';
import marsFragmentShader from './shaders/mars/fragment.glsl';

const marsCanvas = document.getElementById('mars')
const marsScene = new THREE.Scene()
const marsCamera = new THREE.PerspectiveCamera(75, planetsContainer.offsetWidth / planetsContainer.offsetHeight, 0.1, 1000)
const marsRenderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: marsCanvas,
    alpha: true
})
marsRenderer.setSize(planetsContainer.offsetWidth, planetsContainer.offsetHeight)
marsRenderer.setPixelRatio(window.devicePixelRatio)

// Planet Class
class Planet {

    /**
     * @param scene
     * @param camera
     * @param renderer
     * @param planetsContainer
     * @param {HTMLElement} canvas Canvas
     * @param {number} radius Radius of the planet
     * @param {string} texture Path of the texture
     * @param {Object} shader Shader for planet
     * @param {Object} [shader.vertex=null] Vertex shader
     * @param {Object} [shader.fragment=null] Fragment shader
     */

    constructor(scene, camera, renderer, planetsContainer, canvas, radius, texture, shader = {}) {
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.planetsContainer = planetsContainer
        this.canvas = canvas
        this.radius = radius
        this.texture = texture
        this.shader = Object.assign({}, {
            vertex: null,
            fragment: null
        }, shader)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Call Function
        window.addEventListener('resize', this.onWindowResize);
        this.createPlanetSphere()
    }

    onWindowResize() {
        this.camera.aspect = this.planetsContainer.offsetWidth / this.planetsContainer.offsetHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    createPlanetSphere() {
        this.planet = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader: this.shader.vertex,
                fragmentShader: this.shader.fragment,
                uniforms: {
                    globalTexture: {
                        value: new THREE.TextureLoader().load(this.texture),
                    },
                },
            })
        )
        this.scene.add(this.planet)
    }
}

// Add Planets
document.addEventListener('DOMContentLoaded', function () {
    const earth = new Planet(earthScene, earthCamera, earthRenderer, planetsContainer, earthCanvas, 5, "./images/earth.jpg", {
        vertex: earthVertexShader,
        fragment: earthFragmentShader,
    })
    console.log(earth)
    const mars = new Planet(marsScene, marsCamera, marsRenderer, planetsContainer, marsCanvas, 5, "./images/mars.jpg", {
        vertex: marsVertexShader,
        fragment: marsFragmentShader,
    })
    console.log(mars)
})

earthCamera.position.z = 15
marsCamera.position.z = 15

function animate() {
    requestAnimationFrame(animate)
    earthRenderer.render(earthScene, earthCamera)
    marsRenderer.render(marsScene, marsCamera)
}
animate()