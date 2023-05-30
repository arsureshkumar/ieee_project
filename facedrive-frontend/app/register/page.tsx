"use client";

import {Camera} from "react-camera-pro";
import React, { useState, useRef } from "react";
import { sendImage, getTest } from "@/api-handler/api-handlers";

export default function Register() {
  
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    const image = camera.current.takePhoto();
    setImage(image);
    
    if (image) {
        setLoading(true);
        const response = await sendImage(image);
        if (response) {
            setLoading(false);
            console.log(response);
        }
    }
        
  }

  console.log(`This is the image data: ${image}`)

  return (
    <body>
      <h1 className="text-center font-bold"> Register page </h1>
      <div>
        
        <Camera ref={camera} aspectRatio={16 / 9} errorMessages={{
          noCameraAccessible: undefined,
          permissionDenied: undefined,
          switchCamera: undefined,
          canvas: undefined
        }}/>
        
        {loading ? (<h1> Uploading </h1>) : (<h1>Upload Image</h1>)}
        <button onClick={handleClick} className="rounded-lg bg-red-600 p-4"> Take photo </button>
        {image && (<img src={image} alt='Taken photo'/>)}

        
    </div>
    </body>
  )
}