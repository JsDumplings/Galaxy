import {
    useEffect,
    useRef
} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { setBackground } from './../components/StarrySky'

const init = DivEl => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    // camera.position.z = 5;
    // camera.position.y = 5;
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