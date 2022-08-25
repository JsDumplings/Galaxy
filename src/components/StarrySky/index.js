import * as THREE from 'three';
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

export { setBackground }