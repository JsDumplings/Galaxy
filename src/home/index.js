import {
    useEffect,
    useRef
} from 'react';
// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function init(DivEl) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    camera.position.z = 5;
    camera.position.y = 5;
    // 建立坐标
    // const axesHelper = new THREE.AxesHelper(50);
    // scene.add(axesHelper);
    // 栅格
    // let gridHelper = new THREE.GridHelper(100, 30, 0x2C2C2C, 0x888888);
    // scene.add(gridHelper)

    // 鼠标方法
    initContorl(camera, renderer)

    // 星空背景
    let bg = setBackground()
    scene.add(bg)

    renderer.setSize(window.innerWidth, window.innerHeight);
    DivEl.current.appendChild(renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

const initContorl = (camera, renderer) => {
    let controls = new OrbitControls( camera, renderer.domElement )
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = true;
    //设置相机距离原点的最远距离
    controls.minDistance  = 10;
    //设置相机距离原点的最远距离
    controls.maxDistance  = 50;
    //是否开启右键拖拽
    controls.enablePan = true;
}

const setBackground = () => {
    // 定义点光源
    const geometry = new THREE.BufferGeometry();
    // 点组
    let vertices = []
    let colors = []
    for(let i = 0; i < 10000; i++) {
        // 定义一个三维向量
        let vect = new THREE.Vector3()
        vect.x = Math.random() * 2 - 1
        vect.y = Math.random() * 2 - 1
        vect.z = Math.random() * 2 - 1
        vertices.push(vect.x, vect.y, vect.z)
        let color = new THREE.Color();
        color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
        colors.push(color.r, color.g, color.b)
    }
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    let textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load('http://182.43.179.137:81/public/images/texture-smoke.png'); //加载纹理贴图
    let starsMaterial = new THREE.PointsMaterial({
         map: texture,
         size: 1,
         transparent: true,
         opacity: 1,
         vertexColors: true, //true：且该几何体的colors属性有值，则该粒子会舍弃第一个属性--color，而应用该几何体的colors属性的颜色
        //  blending: AdditiveBlending,
         sizeAttenuation: true,
    })
    let stars = new THREE.Points(geometry, starsMaterial);
    stars.scale.set(300, 300, 300);
    return stars
}
const Home = () => {
    const DivEl = useRef()
    useEffect(() => {
        init(DivEl)
    })

    return <div ref = {
        DivEl
    } > </div>
}

export default Home;