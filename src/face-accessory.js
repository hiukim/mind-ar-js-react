import { useEffect, useRef } from "react";
import { MindARThree } from "mind-ar/dist/mindar-face-three.prod.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const FaceAccessory = () => {
    const containerRef = useRef(null);
  useEffect(() => {
    const start = async () => {
      const mindarThree = new MindARThree({
        container: containerRef.current,
      });

      const { renderer, scene, camera } = mindarThree;

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      const light2 = new THREE.DirectionalLight(0xffffff, 0.6);
      light2.position.set(-0.5, 1, 1);
      scene.add(light);
      scene.add(light2);

      // Load occluder
      const occluderLoader = new GLTFLoader();
      occluderLoader.load("headOccluder.glb", (occluder) => {
        occluder.scene.scale.set(0.065, 0.065, 0.065);
        occluder.scene.position.set(0, -0.3, 0.15);
        occluder.scene.traverse((o) => {
          if (o.isMesh) {
            const occluderMaterial = new THREE.MeshPhongMaterial({
              colorWrite: false,
            });
            o.material = occluderMaterial;
          }
        });
        occluder.scene.renderOrder = 0;

        const occluderAnchor = mindarThree.addAnchor(168);
        occluderAnchor.group.add(occluder.scene);
      });

      // Load glasses
      const glassesLoader = new GLTFLoader();
      glassesLoader.load("glasses1/scene.gltf", (glasses) => {
        glasses.scene.scale.set(0.007, 0.007, 0.007);
        glasses.scene.renderOrder = 1;
        const glassesAnchor = mindarThree.addAnchor(168);
        glassesAnchor.group.add(glasses.scene);
      });

      // Load other models...

      // Add event listeners and functionality...

      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };
    start();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}></div>
    // <body>
    //   <div id="selections">
    //     <img id="hat1" src="../../assets/models/hat1/thumbnail.png" />
    //     <img id="hat2" src="../../assets/models/hat2/thumbnail.png" />
    //     <img id="glasses1" src="../../assets/models/glasses1/thumbnail.png" />
    //     <img id="glasses2" src="../../assets/models/glasses2/thumbnail.png" />
    //     <img id="earring" src="../../assets/models/earring/thumbnail.png" />
    //   </div>

    //   <button id="capture"></button>

    //   <div id="preview">
    //     <div id="preview-close">X</div>
    //     <img id="preview-image" />
    //     <div id="preview-share">Share</div>
    //   </div>
    // </body>
  );
};

export default FaceAccessory;
