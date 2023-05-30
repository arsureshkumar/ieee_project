"use client";

import {Camera} from "react-camera-pro";
import React, { useState, useRef } from "react";
import { registerUser } from "@/api-handler/api-handlers";

export default function Register() {
  
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountCreated, setAccountCreaated] = useState(false);

  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    const image = camera.current.takePhoto();
    setImage(image); 
  }

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const response = await registerUser(username, password, image);
    if (response) { console.log(response) }
    //console.log('Username:', username);
    //console.log('Password:', password);
    //console.log(`This is the image data: ${image}`)
  };

  return (
    <body className="m-5">
      <h1 className="text-center font-bold my-10 text-6xl"> Register page </h1>
      
        <div className="flex justify-center gap-2">
          <div className="flex-none w-1/2 rounded-lg">
            <Camera ref={camera} aspectRatio={16 / 9} errorMessages={{
              noCameraAccessible: undefined,
              permissionDenied: undefined,
              switchCamera: undefined,
              canvas: undefined
            }}/>
          </div>
          {image && (<img className="flex-none w-1/4 object-scale-down rounded-lg" src={image} alt='Taken photo'/>)}
        </div>
        
        <div className="flex flex-col items-center">
          {loading ? (<h1> Uploading </h1>) : (<h1>Upload Image</h1>)}
          {!image && (<button onClick={handleClick} className="rounded-lg bg-red-600 p-4"> Take photo </button>)}
          {image && (<button onClick={handleClick} className="rounded-lg bg-red-600 p-4"> Re-take photo </button>)}
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="text-black"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="text-black"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {(password && username && image) && (
            <button type="submit" className="rounded-lg bg-red-600 p-2 hover:cursor-pointer">Submit</button>
          )}
          {(!password || !username || !image) && (
            <button disabled={true} className="rounded-lg bg-slate-700 p-2">Submit</button>
          )}
        </form>
        
    </body>
  )
}