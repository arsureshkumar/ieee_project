"use client";

import {Camera} from "react-camera-pro";
import React, { useState, useRef } from "react";

export default function Home() {
  
  const camera = useRef(null);
  const [image, setImage] = useState(null);


  return (
    <body>
      <h1> Hi there </h1>
      <div>
        <Camera ref={camera} aspectRatio={16 / 9}/>
        <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
      <img src={image} alt='Taken photo'/>
    </div>
    </body>
  )
}
