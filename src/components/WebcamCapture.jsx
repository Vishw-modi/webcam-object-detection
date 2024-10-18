import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
// import * as yolo from "@tensorflow-models/yolo";

const loadModel = async () => {
  const model = await yolo.load(); // Load the YOLO model
  setModel(model);
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [model, setModel] = useState(null);

  // Load the COCO-SSD model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      const cocoModel = await cocoSsd.load();
      setModel(cocoModel);
    };
    loadModel();
  }, []);

  // Function to start video
  const startVideo = () => {
    setIsVideoOn(true);
  };

  // Function to stop video
  const stopVideo = () => {
    setIsVideoOn(false);
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // Function to run object detection
  const detectObjects = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);
      drawBoundingBoxes(predictions);
    }
  };

  // Draw bounding boxes on detected objects
  const drawBoundingBoxes = (predictions) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = webcamRef.current.video.videoWidth;
    canvas.height = webcamRef.current.video.videoHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      const text = `${prediction.class} (${Math.round(
        prediction.score * 100
      )}%)`;

      // Draw rectangle for the object
      context.strokeStyle = "green";
      context.lineWidth = 2;
      context.strokeRect(x, y, width, height);

      // Draw label text
      context.fillStyle = "red";
      context.font = "16px Arial";
      context.fillText(text, x, y > 10 ? y - 5 : 10);
    });
  };

  useEffect(() => {
    if (model && isVideoOn) {
      const interval = setInterval(detectObjects, 100); // Run detection every 100ms
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [model, isVideoOn]);

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user", // Front camera
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Webcam Object Detection</h1>

      <div className="relative">
        {isVideoOn && (
          <div className="border-4 border-blue-600 rounded-lg overflow-hidden mb-6">
            <Webcam
              audio={false}
              ref={webcamRef}
              videoConstraints={videoConstraints}
              className="w-[640px] h-[480px] object-cover"
              mirrored={true}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-[640px] h-[480px]"
            />
          </div>
        )}

        {!isVideoOn && (
          <div className="w-[640px] h-[480px] flex items-center justify-center bg-gray-700 rounded-lg mb-6">
            <p className="text-xl">Video is off</p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        {!isVideoOn && (
          <button
            onClick={startVideo}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
          >
            Start Video
          </button>
        )}

        {isVideoOn && (
          <button
            onClick={stopVideo}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
          >
            Stop Video
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
