"use client"
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Link from 'next/link';

export default function Settings(){

    const [username, setUsername] = useState('');
    const [currPassword, setCurrPassword] = useState('');
    const [newPassword, setNewCurrPassword] = useState('');

    /* Kinda misleading but we don't want the settings button inside settings page so we'll use the other navbar option here */ 
    const loggedIn = false;

    const handleSubmit = (e) => {
        e.preventDefault();
      }

    const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(event.target.value);
    };
    
    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCurrPassword(event.target.value);
    };
    

    return(
        <>
            <Navbar loggedIn = {loggedIn} />
            <h1 className="text-center font-bold mt-12 text-2xl">Settings</h1>
            <div className="w-1/3 mx-auto mt-10">
                <form onSubmit={handleSubmit} className="bg-transparent flex flex-col justify-center">
                    <div>
                        <label htmlFor="username">Username </label>
                        <br />
                        <input
                        className="bg-gray h-10 my-3 px-3 rounded-md w-full"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder={username}
                        />
                    </div>
                    <label htmlFor="password"> Current Password </label>
                    <input
                    type="password"
                    id="password"
                    value={currPassword}
                    onChange={(e) => setCurrPassword(e.target.value)}
                    required
                    className="bg-gray h-10 mt-3 px-3 rounded-md"
                    />       
                    <br />
                    <label htmlFor="password"> New Password </label>
                    <input
                    type="password"
                    id="password"
                    value={newPassword}
                    onChange={(e) => setNewCurrPassword(e.target.value)}
                    required
                    className="bg-gray h-10 mt-3 px-3 rounded-md"
                    />     
                    
                    <br /><br />
                    <Link href="../drive"><button type="submit" className="border px-3 bg-lightblue mx-auto text-white h-10 w-full rounded-md">Save Changes</button></Link>
                    <br />
                    <Link href="../drive"><button type="submit" className="border border-color px-3 bg-while mx-auto text-lightblue h-10 w-full rounded-md">Cancel</button></Link>
                </form>
                <br />
            </div>
        </>
    )
}