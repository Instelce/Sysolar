import './css/style.css'
import * as THREE from 'three';
import { PointLight } from 'three';


class Planet {

  /**
   * @param {HTMLElement} canvas Canvas
   * @param {Object} info
   * @param {Object} [info.radius=5] Radius of the planet 
   */

  constructor(canvas, info = {}) {
    this.canvas = canvas
    this.info = Object.assign({}, {
      radius: 5,
    }, info)

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
      new THREE.SphereGeometry(this.info.radius, 50, 50),
      new THREE.MeshBasicMaterial({
        color: 0x100be8,
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
  new Planet(document.querySelector('#earth'))
})