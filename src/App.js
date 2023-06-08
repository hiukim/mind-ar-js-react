import React, { useState } from 'react';
import './App.css';
// import MindARViewer from './mindar-viewer';
// import MindARThreeViewer from './mindar-three-viewer';
import FaceMesh from './face-mesh';
import FaceAccessory from './face-accessory';

function App() {
  const [started, setStarted] = useState(null);

  return (
    <div className="App">
      <h1>Example React component with <a href="https://github.com/hiukim/mind-ar-js" target="_blank" rel="noreferrer">MindAR</a></h1>

      <div className="control-buttons">
        {/* {started === null && <button onClick={() => {setStarted('aframe')}}>Start AFRAME version</button>}
        {started === null && <button onClick={() => { setStarted('three') }}>Start ThreeJS version</button>} */}
        {started === null && <button onClick={() => { setStarted('face mesh') }}>Face Mesh</button>}
        {started === null && <button onClick={() => { setStarted('face accessory') }}>Face Accessory</button>}
        {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
      </div>

      {/* {started === 'aframe' && (
        <div className="container">
          <MindARViewer/>
          <video></video>
        </div>
      )}

      {started === 'three' && (
        <div className="container">
          <MindARThreeViewer />
        </div>
      )} */}
      
      {started === 'face mesh' && (
        <div className="container">
          <FaceMesh />
        </div>
      )}
      {started === 'face accessory' && (
        <div className="container">
          <FaceAccessory />
        </div>
      )}
    </div>
  );
}

export default App;
