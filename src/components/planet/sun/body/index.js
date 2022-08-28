// 太阳身体
import * as THREE from 'three';
import sunImg from './../../../../asset/images/sun.png'

const geometry = new THREE.SphereGeometry( 15, 32, 16 );
// const material = new THREE.MeshBasicMaterial()
let textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(sunImg);
const material = new THREE.MeshBasicMaterial({
    map: texture
});
const sunBody = new THREE.Mesh( geometry, material );


export default sunBody