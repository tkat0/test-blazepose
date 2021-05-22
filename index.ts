// Import MediaPipe runtime with side effects.
import "@mediapipe/pose";
import * as tf from "@tensorflow/tfjs-data";
import * as poseDetection from "@tensorflow-models/pose-detection";
import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const videoElement = document.createElement("video");
videoElement.width = 640;
videoElement.height = 480;
document.body.appendChild(videoElement);

async function main() {
  // Create a detector.
  const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.BlazePose,
    {
      runtime: "mediapipe",
      modelType: "lite",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
    }
  );

  // Setup webcam
  const _cam = await tf.webcam(videoElement, {
    facingMode: "user",
  });

  const loop = async () => {
    // Pass in a video stream to the model to detect poses.
    stats.begin();
    const poses = await detector.estimatePoses(videoElement);
    stats.end();

    // TODO: draw results
    // See original implementation for details.
    // github.com/tensorflow/tfjs-models/blob/71f57d306c6e3ac4962b9819d17dc7761de62cf8/pose-detection/demos/live_video/src/camera.js#L100

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
}

main();
