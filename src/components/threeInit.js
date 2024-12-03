import * as THREE from "three";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { Line2 } from "three/addons/lines/Line2.js";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import getLayer from "./getLayer";
export default class MyThree {
  constructor() {
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.line = null;
    this.controls = null;
  }
  init() {
    ////一. 创建场景
    // this.scene = new THREE.Scene();

    ////二. 创建物体(几何+材质)
    // const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    // const cubeMaterial = new THREE.MeshNormalMaterial();
    // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    ////this.scene.add(cube);
    ////三. 创建相机
    // this.camera = new THREE.PerspectiveCamera(
    //   45,
    //   window.innerWidth / window.innerHeight,
    //   1,
    //   1000
    // );
    // this.camera.position.set(5, 5, 5);
    // this.camera.lookAt(0, 0, 0);
    ////四. 渲染器
    // this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setPixelRatio(window.devicePixelRatio);

    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setAnimationLoop(this.animation());
    // const viewDom = document.querySelector("#view");
    // viewDom.appendChild(this.renderer.domElement);
    ////五. 辅助工具
    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.enableDamping = true;

    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);
    // const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
    // gridHelper.material.transparent = true;
    // gridHelper.material.opacity = 0.5;
    // this.scene.add(gridHelper);

    // function handleGeometry() {
    ////  更新几何体的width信息
    ////  删除旧的几何体
    //   cube.geometry.dispose();
    ////  重新初始化
    //  cube.geometry = new THREE.BoxGeometry(data.width, data.height, data.depth)
    //   cube.geometry = new THREE.BoxGeometry(...Object.values(data));
    // }
    ////六. 其他
    // window.addEventListener("resize", () => {
    //   this.camera.aspect = window.innerWidth / window.innerHeight;
    //   this.camera.updateProjectionMatrix();
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    // });
    // this.sparkLine();
    // 一. 创建场景
    this.scene = new THREE.Scene();
    let self = this;
    // 二. 创建物体(几何+材质)
    function createPoints() {
      // 创建自定义几何体(600个顶点)
      const geom = new THREE.BufferGeometry();

      // 定义顶点坐标数组, 600个点. 每个点3个坐标
      const count = 600;
      const positionBuffer = new Float32Array(count * 3);

      let i = 0;
      for (let x = -15; x < 15; x++) {
        for (let y = -10; y < 10; y++) {
          positionBuffer[i * 3 + 0] = x * 4;
          positionBuffer[i * 3 + 1] = y * 4;
          positionBuffer[i * 3 + 2] = 0;
          i++;
        }
      }

      const colorBuffer = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        colorBuffer[i * 3 + 0] = Math.random();
        colorBuffer[i * 3 + 1] = Math.random();
        colorBuffer[i * 3 + 2] = Math.random();
      }
      geom.setAttribute(
        "position",
        new THREE.BufferAttribute(positionBuffer, 3)
      );
      geom.setAttribute("color", new THREE.BufferAttribute(colorBuffer, 3));

      // 构建材质
      const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true, // 让每个顶点的颜色不同
      });

      // 创建粒子对象
      const points = new THREE.Points(geom, material);
      self.scene.add(points);
    }
    createPoints();

    // 三. 创建相机
    const camera = new THREE.PerspectiveCamera(
      //   45,
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 10);
    // camera.lookAt(0, 0, 0);
    this.camera = camera;
    // 四. 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setAnimationLoop(animation);
    // function animation() {
    //   renderer.render(self.scene, camera);
    // }
    document.body.appendChild(renderer.domElement);

    // 五. 辅助工具
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    this.controls = controls;
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0xffff00,
    });
    const cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.scene.add(hemiLight);

    const gradientBackground = getLayer({
      hue: 0.8,
      numSprites: 8,
      opacity: 0.2,
      radius: 10,
      size: 28,
      z: -10.5,
    });
    this.scene.add(gradientBackground);
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.02;
      renderer.render(self.scene, camera);
      controls.update();
    }
    animate();
    const axesHelper = new THREE.AxesHelper(10);
    // scene.add(axesHelper)
    const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.5;
    // scene.add(gridHelper)

    // 六. 其他
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    const line = this.sparkLine();
    this.line = line;
    this.scene.add(line);
  }

  getLine() {
    const verts = [0.25, 0, 0, 1.5, 0, 0, 3, 0, 0];
    const colors = [];
    for (let i = 0, len = verts.length; i < len; i += 3) {
      const hue = 0.6 + Math.random() * 0.3;
      const lightness = 1.0 - i / (len - 3);
      let col = new THREE.Color().setHSL(hue, 1, lightness);
      let { r, g, b } = col;
      colors.push(r, g, b);
    }
    const lineGeo = new LineGeometry();

    lineGeo.setPositions(verts);
    lineGeo.setColors(colors);

    const lineMat = new LineMaterial({
      color: 0xeeaaff,
      linewidth: 4,
      dashed: true,
      dashOffset: 0,
      dashSize: 1,
      gapSize: 1,
      vertexColors: true,
    });
    lineMat.resolution.set(window.innerWidth, window.innerHeight);

    const lines = new Line2(lineGeo, lineMat);
    lines.computeLineDistances();
    lines.rotation.y = Math.random() * Math.PI * 2;
    lines.rotation.z = Math.random() * Math.PI * 2;
    const rate = Math.random() * 0.001 + 0.0005;
    function update(t) {
      //   lines.material.dashOffset = t * -rate * 0.5;
      lineMat.dashSize = Math.sin(t * rate);
      lineMat.gapSize = Math.cos(t * rate);
    }
    lines.userData.update = update;
    return lines;
  }
  sparkLine() {
    let self=this
    // const lines=new THREE.Line(lineGeo,lineMat)
    const group = new THREE.Group();
    let numLines = 350;
    for (let i = 0; i < numLines; i++) {
      const line = this.getLine();
      group.add(line);
    }
    function update(t) {
      group.rotation.x += 0.001;
      group.rotation.y -= 0.002;
      group.children.forEach((l) => {
        l.userData.update(t);
      });
    }
    group.userData = { update };
    function animate(t = 0) {
      requestAnimationFrame(animate);
      group.userData.update(t);
      self.renderer.render(self.scene, self.camera);
      self.controls.update();
    }
    animate();
    return group;

    // this.curLine()
  }
  curLine() {
    const matLine = new LineMaterial({
      color: 0xffffff,
      linewidth: 1, // in world units with size attenuation, pixels otherwise
      worldUnits: true,
      vertexColors: true,
      alphaToCoverage: true,
    });
    const positions = [];
    const colors = [];
    const points = [];
    for (let i = -50; i < 50; i++) {
      const t = i / 3;
      points.push(
        new THREE.Vector3(t * Math.sin(2 * t), t, t * Math.cos(2 * t))
      );
    }
    const spline = new THREE.CatmullRomCurve3(points);
    const divisions = Math.round(3 * points.length);
    const point = new THREE.Vector3();
    const color = new THREE.Color();
    for (let i = 0, l = divisions; i < l; i++) {
      const t = i / l;
      spline.getPoint(t, point);
      positions.push(point.x, point.y, point.z);
      color.setHSL(t, 1.0, 0.5, THREE.SRGBColorSpace);
      colors.push(color.r, color.g, color.b);
    }
    const lineGeometry = new LineGeometry();
    lineGeometry.setPositions(positions);
    lineGeometry.setColors(colors);
    const line = new Line2(lineGeometry, matLine);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    this.scene.add(line);
  }
}
