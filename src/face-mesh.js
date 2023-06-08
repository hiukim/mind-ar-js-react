import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-face-three.prod.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three';

const FaceMesh = () => {
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
export default FaceMesh;