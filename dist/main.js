import gsap from 'gsap'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmospherevertexShader from './shaders/atmospherevertex.glsl'
import atmospherefragmentShader from './shaders/atmospherefragment.glsl'
import { _colorStringFilter } from 'gsap/gsap-core'

const canvascontainer = document.querySelector('#canvascontainer')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,canvascontainer.offsetWidth / canvascontainer.offsetHeight, 0.1, 1000)

const reederer = new THREE.WebGLRenderer(
  { antialias: true, 
    canvas: document.querySelector('canvas')
  }
  )
reederer.setSize(canvascontainer.offsetWidth, canvascontainer.offsetHeight)
reederer.setPixelRatio(window.devicePixelRatio)
console.log(canvascontainer)

//create a sphere 
const sphere = new THREE.Mesh(
new THREE.SphereGeometry(5, 50, 50),
new THREE.ShaderMaterial({
  vertexShader,
   fragmentShader,
   uniforms:
    {
      earthtexture:
      { value: new THREE.TextureLoader().load('./earth.png') }
    }
})
)



//create a atmosphere 
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmospherevertexShader,
     fragmentShader: atmospherefragmentShader,
     blending: THREE.AdditiveBlending,
     side: THREE.BackSide
    
  })
  )
  
  atmosphere.scale.set(1.1, 1.1, 1.1)
  scene.add(atmosphere)

  const group = new THREE.Group()
  group.add(sphere)
  scene.add(group)

const Stargeometry = new THREE.BufferGeometry()

const Starmartirals = new THREE.PointsMaterial({
  color: 0xffffff,
})

const starvertices = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000 
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starvertices.push(x, y, z)
}
console.log(starvertices)
Stargeometry.setAttribute('position', new THREE.Float32BufferAttribute(starvertices, 3))

const stars = new THREE.Points(Stargeometry, Starmartirals)
scene.add(stars)

//camera settings
camera.position.z = 14


const mouse = {
  x: undefined,
  y: undefined
}

function animate() {
  requestAnimationFrame(animate)
  reederer.render(scene, camera)
  sphere.rotation.y += 0.003,
  group.rotation.y = mouse.x  * 0.5
  gsap .to(group.rotation, {
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2
  })
}
animate()

addEventListener('mousemove', ()  => {
  mouse.x = (event.clientX / innerWidth)
   * 2 - 1
  mouse.y = (event.clientY / innerHeight
  ) * 2 + 1
  
  

})


