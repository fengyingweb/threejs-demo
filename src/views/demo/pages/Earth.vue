<template>
  <div class="wrapper" ref="container"></div>
</template>

<script>
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
const earthImg = require('@/assets/img/earth_cloud.jpg');
export default {
  name: 'Earth',
  data() {
    return {
      container: null,
      scene: null,
      group: null,
      camera: null,
      renderer: null,
      stats: null,
      mouseX: 0,
      mouseY: 0,
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,
      earthImg,
      radius: 6371
    }
  },

  methods: {
    onDocumentMouseMove(event) {
      this.mouseX = event.clientX - this.windowHalfX;//鼠标基于中心点的偏移量；
      this.mouseY = event.clientY - this.windowHalfY;//鼠标基于中心点的偏移量；
    },

    onWindowResize(event) {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth,window.innerHeight);
    },

    render() {
      this.camera.position.x
        += (this.mouseX - this.camera.position.x)*0.05;//在x轴上，相机根据鼠标的位置移动来移动的距离
      this.camera.position.y 
        += (-this.mouseY - this.camera.position.y)*0.05;//在y轴上，相机根据鼠标的位置移动来移动的距离
      this.camera.lookAt(this.scene.position);//设置视野的中心坐标
      this.group.rotation.y -= 0.005;//让它饶着y轴旋转 （间接的得到旋转的速度）
      this.renderer.render(this.scene, this.camera);//将webgl视图往外输出
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.render();
      this.stats.update();
    },

    init() {
      this.container = this.$refs['container'];
      this.scene = new THREE.Scene();
      // this.scene.background = new THREE.Color(0x505050);
      this.group = new THREE.Group();
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 50, 1e7); //相机摆上 设置相机摆放位置 产生镜头
      this.camera.position.z = this.radius * 5; //拍的景物离我500px
      
      this.initStar();

      this.renderer = new THREE.WebGLRenderer({
        antialias: true, // 去掉锯齿
        alpha: false
      });
      // this.renderer.setClearColor(0x267aff, 0.1);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight, true);//container展示的大小
      this.container.appendChild(this.renderer.domElement)//追加 【canvas】 元素到 【container】 元素中
      this.stats = new Stats();
      // console.log(this.stats);
      this.container.appendChild(this.stats.dom);

      // 加载材质
      let loader = new THREE.TextureLoader();
      // 'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg'
      loader.load(this.earthImg,
        (texture)=> {
          //画球体 形状
          let geometry = new THREE.SphereGeometry(this.radius, 100, 100);
          // 贴图 材质纹理
          let material = new THREE.MeshBasicMaterial({
            map: texture
          });
          // 地球
          let mesh = new THREE.Mesh(geometry, material);
          this.group.add(mesh);
      });
      this.scene.add(this.group);

      this.animate();

      document.addEventListener('mousemove', (event)=> {
        this.onDocumentMouseMove(event);
      }, false);//用鼠标拖
      window.addEventListener('resize',(event)=> {
        this.onWindowResize();
      },false);
    },

    initStar() {
        let i, r = this.radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];
				let vertices1 = [];
				let vertices2 = [];
				let vertex = new THREE.Vector3();
				for ( i = 0; i < 250; i ++ ) {
					vertex.x = Math.random() * 2 - 1;
					vertex.y = Math.random() * 2 - 1;
					vertex.z = Math.random() * 2 - 1;
					vertex.multiplyScalar( r );
					vertices1.push( vertex.x, vertex.y, vertex.z );
				}
				for ( i = 0; i < 1500; i ++ ) {
					vertex.x = Math.random() * 2 - 1;
					vertex.y = Math.random() * 2 - 1;
					vertex.z = Math.random() * 2 - 1;
					vertex.multiplyScalar( r );
					vertices2.push( vertex.x, vertex.y, vertex.z );
				}
				starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
				starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );
				let stars;
				let starsMaterials = [
					new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
				];
				for ( i = 10; i < 30; i ++ ) {
					stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
					stars.rotation.x = Math.random() * 6;
					stars.rotation.y = Math.random() * 6;
					stars.rotation.z = Math.random() * 6;
					stars.scale.setScalar( i * 10 );
					stars.matrixAutoUpdate = false;
					stars.updateMatrix();
					this.scene.add( stars );
				}
    }
  },

  mounted() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
</style>
