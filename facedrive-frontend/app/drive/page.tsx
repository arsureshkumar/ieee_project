"use client"

import Navbar from "../components/Navbar"
import Folder from "../components/Folder";
import File from "../components/File";
import { useState } from "react";

export default function Drive(){

    const loggedIn = true;
    const [addFolder, setAddFolder] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [folderName, setFolderName] = useState('');

    interface Folder {
        name: string;
    }

    const handleAddFolder = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const newFolder: Folder = {
          name: folderName,
        };
        setFolders((prevFolders: Folder[]) => [...prevFolders, newFolder]);
        setFolderName('');
        handleAddFolderPopUp();
    };

    const handleAddFolderPopUp = () => {
        setAddFolder(!addFolder);
    }

    const handleFolderNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setFolderName(event.target.value);
    };

    return(
        <>
            <Navbar loggedIn = {loggedIn}/>

            <div className="flex justify-between">
                <div className="ml-8 mt-8 font-bold text-xl">Root /</div>
                <div className="flex">
                    {/*Button to add image*/}
                    <button>
                        <img className="mr-5 mt-8 mb-3" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC/UlEQVR4nO2YTU8TURSG+2PUf6ELFREKionGiDFx6Y4FX0uDGLDtqJg0lMhGATcGKH5VqBLRWJiZttCSgrH0Q2Gm1SBMEQwG6X3NmYpAmSJtmYbEvsmbTmbuvefpOXPuLRgMRRV1AFR6awwH0YatgAdNpUVA/O8ZdIRYQZ2uIqCjmMFQ8R3EvjbJUIRh+BPDm1mGqXmGsMLwcYHBHWMY1Mg23aNnNIbGBuZTc2kNWivvLh4MM7jmGEY+M3jiDJEEQzSx+bnV/q8MzgjD+7mUX0VS99LHRbesQWvS2hSDYmUNOD2fOYBmUGU7QDZzKVbWgDOL2QWJ5mGKlTVgpsVCCsPEl9S7JMjbM5eP8wYMLTKIseSOF3w4miqR1hfhpST6PjD0TCbhiSf1AaQuHJO1O9Xxxy9DDKNSqlspu8+DDJ3jSXR4tvtpkCG4sE+A098YXFIq+F437WczDA98bAfYhpuGFFzrCeGi1YcKTlB92eZDkz0MbzRRuJPk8XQS972bYNy7FVR3BHDB6kd9fwzmtyuwCr9U0zXdq7b5UdM9BWlhVX9AB2UzyPDQz3DztYKzdzxoHIijw62dWbLNs46GgRjO3/NgcnapMD+3Hk38QNVdD5qdiYxg6W52KipkQQCvdgbQ+CSuCbIhrWcN9hiMFjG3fXCvdgQUXGr3q6XLFpDmnGvz4rTJdUI3wOv2sJqJTKXcDZBc1ydTl3frBljd7oNlZCVnQPPIMio4UdINsPK2CCu/tgPoX9oYbxXWUGbif+r2Z+cZAhTyAOTXUGbmV3UDvGLbhxJbdilxvrK8CKO+X84ZsLZXgpFzd+kGOB5NqI2S6zZT1eZdLWnlj+v67zejRUS9Xc4asK5fTho5QTTorbIW4Ui5RfhOx9dej7obTgU051TL6CFDIVTS6jpWbhaW6uzyeqZyq2V1r6uZK7cIy6Um/qihkDppGjts5ER3VZt3ubZXYtShtI2Q6bq2T2L0jMpasMxpic7WSk7oou2DNmEyXRs5oetvQ6TpN6X6vREXhqNIAAAAAElFTkSuQmCC"/>
                    </button>
                    {/*Button to add folder*/}
                    <button onClick={handleAddFolderPopUp}>
                        <img className="mr-8 mt-8 mb-3" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAACS0lEQVR4nO2Y32vTUBTH+8eo/4U+OGdt00FVEJ3g83xuuz06LWy2ybSD2vVtUvFtbapghT5IfZjLTdoRsUMGhvShqQ8KiWvnj9rlyMmYD1vrmshN+pAvfOGSm8v9cM6954QEAr58TYCCD7dgXDOssOIJYOWTeaqLO7/gRna7x3Dk0UQCVryCDNoARD/f7kH0sTSwczSc2BHgau0LXM/UIflSgd2vA1ANk4pPAI7rO3kZ3uzuUQNTRwHS3lD1AQ0/guCfQdW/JIb35UX166DhR9D0/PypXvXiVx90WCwrMJuTIcIRy7fXZLjPK1Bp6t4BCq19mFtvwq3ce0iUOpB+24Ms+W0Zx/gM5+4+3QHS+u4uYPWjYX0/Lrz4DHnpAPL14V6rD2C+3IFrmbq1xhVAobVvbZisGiPBjjtZ1a01rgDOrTcPIzcE5EjD5ub5DjCsSBew0tStc4WpswuIa65mGnAltTlFDfAer1iRGJXKfwGi40UNb/kzaoCzORnYWs8xYLrWhQgntqkBzqyIkBX6J4BO09H7WdKHUEr4SReQ/Aeg0IdQWvgx2SlmKaZ4saxAoqQ5BoxtaMBwUoEa4OumDjefyI7LTHS1AdPLwkXbfxbs/aoTIcFrtgHjJQ0iLDlML02Flsi5MEv2sH2N2+oeVHXANZeX3p0JuKHp5c0L4TT5Fue1wah0W2mVBhi5gzBLusGUcD7gpi6lts4ynChFM41ubKNt4g3FMoLGcazYNnGO4YjoWuSGCXvrDEcKWD6wCKNxzHCk8PdCHNMfpLePctjTmOUAAAAASUVORK5CYII="/>
                    </button>
                </div>
            </div>

            {
                addFolder && 
                <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center backdrop-blur">
                    <form onSubmit={handleAddFolder} className="w-96 flex flex-col items-center rounded-md bg-lightblue py-5">
                        <label className="text-white text-xl">Folder Name</label>
                        <input 
                            type="text"
                            id="foldername"
                            value={folderName}
                            onChange={handleFolderNameChange}
                            required
                            maxLength={30}
                            className="my-2 px-2 rounded-md"
                        />
                        <div className="flex justify-between mt-2">
                            <button onClick={handleAddFolder} className="border px-3 bg-darkblue mx-auto text-white h-10 w-full rounded-md">Add</button>
                            <button onClick={handleAddFolderPopUp} className="border px-3 bg-darkblue mx-auto ml-3 mb-3 text-white h-10 w-full rounded-md">Cancel</button>
                        </div>
                    </form>
                </div>
            }

            <div>
                
                {folders.map((folder, index) => (
                    <Folder key={index} name={folder.name} />
                ))}

                <File 
                    name = {"Image 1"} 
                    url = {"https://loremflickr.com/320/240"}
                />
            </div>
        </>
    )
}