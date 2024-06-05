"use client"
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      // Stop all tracks to release the camera until the user interacts
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error("Permission denied:", err);
      setHasPermission(false);
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
    }
  }, [webcamRef]);

  return (
    <div style={{ textAlign: 'center' }}>
      {hasPermission === null && (
        <button onClick={requestPermissions} style={{ marginTop: '10px' }}>
          Enable Camera
        </button>
      )}
      {hasPermission === false && (
        <p>Permission denied. Please enable camera access in your browser settings.</p>
      )}
      {hasPermission && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: "user"
            }}
            style={{ maxWidth: '100%' }}
          />
          <button onClick={capture} style={{ marginTop: '10px' }}>Capture Photo</button>
        </>
      )}
    </div>
  );
};

export default Camera;
