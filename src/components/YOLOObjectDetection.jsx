// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const YOLOObjectDetection = () => {
//   const webcamRef = useRef(null);
//   const [detections, setDetections] = useState([]);

//   const API_URL = "https://detect.roboflow.com/your-model";
//   const API_KEY = "your-api-key"; // Get this from Roboflow after creating a project

//   // Function to capture an image and send it to YOLO for object detection
//   const detectObjects = async () => {
//     if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//       const screenshot = webcamRef.current.getScreenshot();

//       const response = await axios.post(
//         `${API_URL}?api_key=${API_KEY}`,
//         { image: screenshot },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setDetections(response.data.predictions);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(detectObjects, 3000); // Detect every 3 seconds
//     return () => clearInterval(interval); // Cleanup
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-4xl font-bold mb-8">YOLO Object Detection</h1>

//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         className="w-[640px] h-[480px] object-cover"
//       />

//       <div className="mt-4">
//         {detections.length > 0 ? (
//           <ul>
//             {detections.map((detection, idx) => (
//               <li key={idx} className="text-xl">
//                 {`${detection.class}: ${Math.round(
//                   detection.confidence * 100
//                 )}%`}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No objects detected</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default YOLOObjectDetection;
