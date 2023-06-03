"use client";

import {Camera} from "react-camera-pro";
import React, { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Link from "next/link";
import { loginUser } from "@/api-handler/api-handlers";

export default function Login() {

    const camera = useRef(null);
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const [openCam, setOpenCam] = useState(true); // camera is open on login
    
    const loggedInState = false;
    const [invalidPhoto, setInvalidPhoto] = useState(false);
    const [invalidUserName, setInvalidUsername] = useState(false);
    const [requirePassword, setRequirePassword] = useState(false);
    
    const handleOpenCam = () => {
        setImage('');
        setOpenCam(!openCam);
      }
      
    const handleTakePhoto = () => {
        const image = camera.current.takePhoto();
        handleOpenCam(); 
        setImage(image); 
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const response = await loginUser(username, image);
      const data = await response.json();
      console.log(response)
      if (response.status == 200) {
        setSuccessLogin(true)
        router.push(`/drive/${data.username}`);
      } 
      // User does not exist
      else if (response.status == 404) {
        console.log("User not exist");
        setIsLoading(false);
        setInvalidUsername(true);
        setUsername('');
      } 
      // Face not recognized
      else if (response.status == 400) {
        console.log("Face not recognized");
        setIsLoading(false);
        setInvalidPhoto(true);
        setImage('');
      }
    }
  
    return (
        <body className="bg-transparent">
            <Navbar loggedIn={loggedInState} username=""/>
            <h1 className="text-center font-bold mt-12 text-2xl"> Welcome Back!</h1>
            <div className="w-1/3 mx-auto mt-10">
                <form onSubmit={handleSubmit} className="bg-transparent flex flex-col justify-center">
                    <label htmlFor="username"> Username </label>
                        <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-gray h-10 mt-3 px-3 rounded-md"
                        />
                    <br />
                    
                    {requirePassword && (
                        <>
                            <label htmlFor="password">Password </label>
                            <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-gray h-10 mt-3 px-3 rounded-md"
                            />
                            <br />
                        </>
                    )}

                    {invalidPhoto && (
                        <>
                            <div className="text-red-500 text-center"> 
                                <h1> Invalid photo </h1>
                            </div>
                            <br />
                        </>
                    )}

                    {invalidUserName && (
                        <>
                            <div className="bg-red-100 p-2 rounded-lg">
                                <h1 className="text-red-500 text-center"> Username does not exist </h1>
                            </div>
                            <br />
                        </>
                    )}

                    <div className="flex justify-center bg-lightblue backdrop-blur rounded-lg p-2">
                        { (!image || openCam ) &&  
                        <div className="flex-none w-full rounded-lg">
                            <Camera ref={camera} aspectRatio={16 / 9} errorMessages={{
                                noCameraAccessible: undefined,
                                permissionDenied: undefined,
                                switchCamera: undefined,
                                canvas: undefined
                            }}/>
                        </div>}
                        {(image && !openCam ) && (<img className="flex-none w-max object-scale-down rounded-lg" src={image} alt='Taken photo'/>)}
                    </div>
                    <br />

                    <div className="flex flex-col items-center">
                        <div className="flex justify-center space-x-4 mb-3">
                            { (!image || openCam ) && (<button onClick={handleTakePhoto} className="border px-3 bg-lightblue text-white h-10 rounded-md w-28">Take Photo</button>)}
                            { (image && !openCam) && (<button onClick={handleOpenCam} className="border px-3 bg-lightblue text-white h-10 rounded-md w-28">Re-take</button>)}
                        </div>
                    </div>
                    <br />
                    
                    {(username && image && !requirePassword) && (
                        <button type="submit" className="border px-3 bg-lightblue mx-auto text-white h-10 w-full rounded-md"> Login </button>
                    )}

                    {(!username || !image) && (
                        <button type="submit" disabled={true} className="border px-3 bg-sky-500/50 mx-auto text-white h-10 w-full rounded-md"> Login </button>
                    )}

                </form>
                <br />
                <h4 className="text-center"> Don't have an account? <Link href="/register">Sign up now!</Link></h4>
                <br />
            </div>

            {isLoading && (
                <div className="fixed top-0 left-0 bg-sky-500/50 w-screen h-full flex items-center justify-center backdrop-blur">
                    <div className="loader"/>
                </div>
            )}


        </body>
    )

}