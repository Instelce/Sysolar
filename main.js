import './css/style.css'
import * as THREE from 'three';
import { PointLight } from 'three';

// For earth
import vertexShader from './shaders/earth/vertex.glsl';
import fragmentShader from './shaders/earth/fragment.glsl';


class Planet {

  /**
   * @param {HTMLElement} canvas Canvas
   */

  constructor(canvas, radius) {
    this.canvas = canvas
    this.radius = radius

    this.planetsContainer = document.querySelector(".planet")

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.planetsContainer.offsetWidth / this.planetsContainer.offsetHeight,
      0.1,
      1000
    )
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true
    })
    this.renderer.setSize(this.planetsContainer.offsetWidth, this.planetsContainer.offsetHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.camera.position.z = 15

    // Call Function
    window.addEventListener('resize', this.onWindowResize);
    this.createPlanetSphere()
    // this.createLight()
    this.animate()
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

      })
    )
    this.scene.add(this.planet)
  }

  createLight() {
    let light = new THREE.Light(0xffffff, 1)
    light.position.set(0, 0, 10)
    this.scene.add(light)
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new Planet(document.querySelector('#earth'), 5)
})