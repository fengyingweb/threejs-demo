<template>
  <div class="wrapper">
    <div class="cube"></div>
    <div class="btn" @click="GoToVR">Go To VR</div>
    <div class="btn" @click="GoToEarth">Go To Earth</div>
  </div>
</template>

<script>
import * as THREE from 'three';
export default {
  name: 'Home',
  data () {
    return {
      title: 'Three.js'
    }    
  },

  methods: {
    initCube() {
      window.requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function (callback) {
				  window.setTimeout(callback, 1000/60);
				}
				// console.log(THREE);
				let cubeEl = document.querySelector('.cube');
        let scene = new THREE.Scene(); // 场景
        scene.background = new THREE.Color(0x505050);
        scene.receiveShadow = true;
				let camera = new THREE.PerspectiveCamera(45, cubeEl.clientWidth/cubeEl.clientHeight, 0.1, 1000); // 相机 params: 视野, 宽高比, 近端, 远端

        // 光照
        let spotLight = new THREE.SpotLight( 0xffffff, 2 );
        spotLight.position.set( -20, 5, 20 ).normalize();
        spotLight.castShadow = true;
        scene.add(spotLight);

				let renderer = new THREE.WebGLRenderer({
          antialias: true // 去掉锯齿
        }); // 渲染器
        // console.log(renderer)
				renderer.shadowMap.enabled = true;
				renderer.setSize(cubeEl.clientWidth, cubeEl.clientHeight, true); // setSize(width, height, updateStyle)设置尺寸
				cubeEl.appendChild(renderer.domElement);
				
				// 添加立方体
				let geometry = new THREE.BoxGeometry(1, 1, 1);
				let material = new THREE.MeshPhongMaterial({ color: '#f56' });
				let cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
				scene.add(cube);
				
				camera.position.z = 5;
				
				// 渲染场景
				function animate () {
					requestAnimationFrame(animate);
					cube.rotation.x += 0.01;
					cube.rotation.y += 0.01;
					renderer.render(scene, camera);
				}
				animate();
    },

    GoToVR() {
      this.$router.push({path: '/VR'});
    },

    GoToEarth() {
      this.$router.push({path: '/earth'});
    }
  },

  mounted() {
    this.initCube();
  }
}
</script>

<style lang="scss" scoped>
</style>
