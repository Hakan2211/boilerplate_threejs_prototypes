import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();
    this.time = 0;
    this.container = options.dom;

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      10
    );
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.resize();
    this.setupResize();
    this.addObjects();
    this.render();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    this.material = new THREE.MeshNormalMaterial();

    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render() {
    this.time += 0.5;
    this.mesh.rotation.x = this.time / 2000;
    this.mesh.rotation.y = this.time / 1000;

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  dom: document.getElementById("container"),
});
