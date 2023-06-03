// import React, { useEffect, useRef } from 'react';
// import { useLoader } from '@react-three/fiber';
// import { MindARThree } from 'mind-ar/dist/mindar-face-three.prod.js'; // error
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
// // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import * as THREE from 'three';

// export default () => {
//   const containerRef = useRef(null);

//     useEffect(() => {
//     //   const gltf = useLoader(GLTFLoader, './models/monkey.glb')
//     const mindarThree = new MindARThree({
//         container: containerRef.current,
//     });
//     const {renderer, scene, camera} = mindarThree;

//     const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
//     scene.add(light);

//     const faceMesh = mindarThree.addFaceMesh();
//     // const texture = loadTexture('../../assets/facemesh/face-mask-template/Face_Mask_Template.png');
//     const texture = useLoader(TextureLoader, './public/facemesh.png');
//     faceMesh.material.map = texture;
//     faceMesh.material.transparent = true;
//     faceMesh.material.needsUpdate = true;
//     scene.add(faceMesh);

//     mindarThree.start();
//     renderer.setAnimationLoop(() => {
//       renderer.render(scene, camera);
//     });

//     return () => {
//       renderer.setAnimationLoop(null);
//       mindarThree.stop();
//     }
//   }, []);

//     return (
//         <div style={{width: "100%", height: "100%"}} ref={containerRef}>
//         </div>
//     )
// }

import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-face-three.prod.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';

export default () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadMindARThree = async () => {
      const mindarThree = new MindARThree({
        container: containerRef.current,
      });
      await mindarThree.start();
  
      const { renderer, scene, camera } = mindarThree;
  
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);
  
      const faceMesh = mindarThree.addFaceMesh();
      const texture = new TextureLoader().load('bluemask.png');
      
      faceMesh.material.map = texture;
      faceMesh.material.transparent = true;
      faceMesh.material.needsUpdate = true;
      scene.add(faceMesh);
  
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
  
      return () => {
        renderer.setAnimationLoop(null);
        mindarThree.stop();
      };
    };
  
    loadMindARThree();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}></div>
  );
}
