import React from "react"
import Webcam from "react-webcam"

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

export const WebcamComponent = () => {
    return (
        <Webcam
        videoConstraints={videoConstraints} 
        width={480} 
        height={720}
         />
    )
} 