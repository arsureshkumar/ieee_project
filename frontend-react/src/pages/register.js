import Webcam from "react-webcam"
import React, { useState, useEffect } from "react";

export const RegisterPage = () => {
    
    const [userFace, setUserFace] = useState(null);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };

    console.log(userFace)
    
    return (
        <body>
            <h1> Take a Picture </h1>
            <Webcam
                audio={false}
                height={720}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            >
                {({ getScreenshot }) => (
                <button
                    onClick={() => {
                    const imageSrc = getScreenshot();
                    setUserFace(imageSrc);
                    }}
                >
                    Capture photo
                </button>
                )}
            </Webcam>
            
            {userFace && (
                <img src={userFace} alt='User Face'/>
            )}
        </body>

    )
}
