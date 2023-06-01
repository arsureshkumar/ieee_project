"use client";

import {Camera} from "react-camera-pro";
import React, { useState, useRef } from "react";
import { registerUser } from "@/api-handler/api-handlers";
import Navbar from "../components/Navbar";

export default function Register() {
  
  const camera = useRef(null);
  
  const [image, setImage] = useState('');
  // const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [accountCreated, setAccountCreated] = useState(false);

  const [fSetup, setfSetup] = useState(false);
  const [openCam, setOpenCam] = useState(false);


  const loggedInState = false;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFSetup = () => {
    setfSetup(!fSetup);
    handleOpenCam();
  }

  const handleOpenCam = () => {
    setOpenCam(!openCam);
  }
  

  const handleTakePhoto = () => {
    const image = camera.current.takePhoto();
    setImage(image); 
    handleOpenCam(); 
  }

  // const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setName(event.target.value);
  // };

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    const value = event.target.value;
    setConfirmPassword(event.target.value);
    setPasswordsMatch(value === password);
  };

  const handleUploadFile = () => {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle the selected file
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Process the selected file here
      console.log('Selected file:', selectedFile);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      const response = await registerUser(username, password, image);
      if (response) { console.log(response) }
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setImage('')
      handleFSetup();
      console.log('Username:', username);
      console.log('Password:', password);
      console.log(`This is the image data: ${image}`)
    }
    // event.preventDefault();
    // const response = await registerUser(username, password, image);
    // if (response) { console.log(response) }
  };

  return (
    <body className="m-5">
      
      <Navbar loggedIn = {loggedInState} />

      <div className="w-1/3 mx-auto mt-10">
      <h1 className="text-center font-bold mt-12 mb-8 text-2xl">Register for Face Drive</h1>
  
        <form onSubmit={handleSubmit}>

        <h2 className="text-center mt-6 mb-4 font-bold">Basic Information</h2>

          <div>
            <label htmlFor="username">Username </label>
            <br />
            <input
              className="bg-gray h-10 my-3 px-3 rounded-md w-full"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <br />
            <input
              className="bg-gray h-10 my-3 px-3 rounded-md w-full"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <br />
            <input
              className="bg-gray h-10 my-3 px-3 rounded-md w-full"
              type="password"
              id="passwordC"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          {!passwordsMatch && <p className="text-red-500">Passwords do not match.</p>}

          <h2 className="text-center mt-6 mb-4 font-bold">Set Up Facial Recognition</h2>

          { fSetup && <>
            <div className="flex justify-center gap-2">
            { (!image || openCam ) && <div className="flex-none w-full rounded-lg">
              <Camera ref={camera} aspectRatio={16 / 9} errorMessages={{
                noCameraAccessible: undefined,
                permissionDenied: undefined,
                switchCamera: undefined,
                canvas: undefined
              }}/>
            </div>}
            { (image && !openCam ) && (<img className="flex-none w-max object-scale-down rounded-lg" src={image} alt='Taken photo'/>)}
          </div>
          
            <div className="flex flex-col items-center">
              {/* { !loading ? (<h1> Uploading </h1>) : (<h1>Upload Image</h1>)} */}
              <div className="flex justify-center space-x-4 mb-3">
                { (!image || openCam ) && (<button onClick={handleTakePhoto} className="border px-3 bg-lightblue text-white h-10 rounded-md w-28">Take Photo</button>)}
                { (image && !openCam) && (<button onClick={handleOpenCam} className="border px-3 bg-lightblue text-white h-10 rounded-md w-28">Re-take</button>)}
                {(<button onClick={handleFSetup} className="border px-3 bg-lightblue text-white h-10 rounded-md w-28">Cancel</button>)}
              </div>
            </div>
          </>
        }

        <div className="flex justify-center space-x-4 mb-3">
            { !fSetup && 
            <>
            <button onClick={handleFSetup} className="border px-3 bg-lightblue text-white h-10 w-1/3 rounded-md">Take a photo</button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileSelected}
            />
            <button
              onClick={handleUploadFile}
              className="border px-3 bg-lightblue text-white h-10 w-1/3 rounded-md"
            >
              Upload a photo
            </button></>}
          </div>
        
        

          {( password && username && image) && (
            <button type="submit" className="border px-3 bg-lightblue mx-auto mt-5 mb-12 text-white h-10 w-full rounded-md">Register</button>
          )}
          {( !password || !passwordsMatch || !username || !image) && (
            <button type="submit" disabled={true} className="border px-3 bg-sky-500/50 mx-auto mt-5 mb-12 text-white h-10 w-full rounded-md">Register</button>
          )}
        </form>

        </div>
        
    </body>
  )
}