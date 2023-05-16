"use client";

import {Camera} from "react-camera-pro";
import React, { useState, useRef } from "react";
import { sendImage } from "@/api-handler/api-handlers";

export default function Register() {
  
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setImage(camera.current.takePhoto());
    setLoading(true);
    if (image) {
        const response = await sendImage(image)
        if (response) {
            setLoading(false);
            console.log(response);
        }
    }
        
  }

  console.log(`This is the image data: ${image}`)

  return (
    <body>
      <h1> Register page </h1>
      <div>
        <Camera ref={camera} aspectRatio={16 / 9}/>
        <button onClick={handleClick}>Take photo</button>
        {loading ? 'Uploading...' : 'Upload Image'}
        {image && (<img src={image} alt='Taken photo'/>)}
    </div>
    </body>
  )
}