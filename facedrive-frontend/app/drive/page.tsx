"use client"

import Navbar from "../components/Navbar"
import Folder from "../components/Folder";
import File from "../components/File";

export default function Drive(){

    const loggedIn = true;

    return(
        <>
            <Navbar loggedIn = {loggedIn}/>

            <div className="ml-8 mt-8 font-bold text-xl">Root /</div>

            <div>
                <Folder name = {"Folder 1"} />
                <File 
                    name = {"Image 1"} 
                    url = {"https://loremflickr.com/320/240"}
                />
            </div>
        </>
    )
}