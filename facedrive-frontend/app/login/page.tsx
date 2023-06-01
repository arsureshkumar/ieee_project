"use client";

import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Link from 'next/link';

export default function Login() {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const loggedInState = false;
  
    const handleSubmit = (e) => {
      e.preventDefault();
    }
  
      // Here you can perform validations, API calls, etc.
  
      console.log('Username:', username);
      console.log('Password:', password);
      
    return (
        <body className="bg-transparent">
            <Navbar loggedIn={loggedInState}/>
            <h1 className="text-center font-bold mt-12 text-2xl">Welcome Back!</h1>
            <div className="w-1/3 mx-auto mt-10">
                <form onSubmit={handleSubmit} className="bg-transparent flex flex-col justify-center">
                    <label htmlFor="username">Username </label>
                    <input
                    type="username"
                    id="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                    className="bg-gray h-10 mt-3 px-3 rounded-md"
                    />
                    <br />
                    <label htmlFor="password">Password </label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray h-10 mt-3 px-3 rounded-md"
                    />
                    <br /><br />
                    <button type="submit" className="border px-3 bg-lightblue mx-auto text-white h-10 w-full rounded-md">Login</button>
                </form>
                <br />
                <h4 className="text-center">Don't have an account? <Link href="../register/" className="font-bold">Sign up now!</Link></h4>

            </div>
        </body>
    )

}