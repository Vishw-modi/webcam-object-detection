import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(false); // State to track if video is on

  // Function to start the video
  const startVideo = () => {
    setIsVideoOn(true);
  };

  // Function to stop the video
  const stopVideo = () => {
    setIsVideoOn(false);
    setScreenshot(null); // Clear any captured screenshot
  };

  // Function to capture screenshot
  const captureScreenshot = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshot(imageSrc);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold text-white mb-6">Webcam Stream</h1>

      {isVideoOn ? (
        <div className="border-4 border-blue-500 rounded-lg overflow-hidden mb-6">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-[640px] h-[480px] object-cover"
            mirrored={true}
          />
        </div>
      ) : (
        <div className="w-[640px] h-[480px] flex items-center justify-center bg-gray-700 text-white rounded-lg mb-6">
          <p>Video is off</p>
        </div>
      )}

      <div className="flex space-x-4">
        {!isVideoOn && (
          <button
            onClick={startVideo}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            Start Video
          </button>
        )}

        {isVideoOn && (
          <>
            <button
              onClick={captureScreenshot}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Capture Photo
            </button>

            <button
              onClick={stopVideo}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              Stop Video
            </button>
          </>
        )}
      </div>

      {screenshot && (
        <div className="mt-6">
          <h2 className="text-white text-lg font-semibold mb-2">Screenshot:</h2>
          <img
            src={screenshot}
            alt="Webcam Screenshot"
            className="border-4 border-green-500 rounded-lg pb-4"
          />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
