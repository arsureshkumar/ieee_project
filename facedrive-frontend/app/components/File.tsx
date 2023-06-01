import React, { useState } from 'react';

interface FileProps{
    name: String,
    url: String
}

const File: React.FC<FileProps> = ({ name, url }) => {

    const [fileOpen, setFileOpen] = useState(false);

    const handleOpenFile = () => {
        setFileOpen(!fileOpen);
    }

    return(
        <>
            <hr className="mt-3 w-98 mx-auto bg-lightblue"/>
            <button onClick={handleOpenFile}>
                <div className="flex justify-items-start ml-10 mt-3 mr-5">
                    <div className="w-10">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABuUlEQVR4nO2Uv0sCYRjH759IFEKXpgKhoK2hqUFaavIPUBNq6AcZSSIRxkFZR0NIP2zLoa2phsRMEi+QCqFsqbdyEiowUYN64g5OqMOTON7XC58vfLnlGb6f9/k+x3EoFF0JYg0omf+3AFuXH+wgBAoAt2+fsM0KQqAAQMpf7CAESgDMIASKAIQFBG0AQhuCBQChCcEKgNCCYAlAaECwBiC/IAwJ8BdzCCDiBgArpEdYIRErpE9tVyFXrADu/ULTuZHoM1j9ORjdKxgHYClRAutECjrHU7AYL2nO2vw5sPiu5a8hANYzNegPZqHDnZDdF8jCWqbacF56eZu0gahBNuDcua+HV+zcffgxE4y/yzbcDSwcv4LFm1QBmL1JmD96kWfC6Sr0Lt+BPZSH1XTFOADhdAV65kRVeMXdsxk5sCPyKHdesiPyZByA4Y18w/CKB/ibenjFroNi6wGmD4tg8miHN40lweK7UgFIBxw4KbUOgD8rQ9fUufbre07BPJNVhVdsD+Vhpck9UAMY5HNNq2OevGgYXvHQJmn9X4imOQQQcQOAFdIjrJCIFdInrJCIFWrzCqFQnKa+AdVhgxftio6qAAAAAElFTkSuQmCC"/>                   
                    </div>
                    <h2 className="ml-5 my-auto">{name}</h2>
                </div>
            </button>
            {
                fileOpen && 
                <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center backdrop-blur">
                    <div className="absolute top-0 left-0 w-screen h-15 bg-slate-200 shadow-md flex">
                        <button onClick={handleOpenFile}>
                            <img className="absolute top-8 left-0 ml-10 w-10" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVUlEQVR4nO2UQQrAMAgEx5/1Re1X0puvraHgKZBT2NKAA15nQEEodsFyZPIbcEXEUh7AAxxK+VnyT9cSizMNNGVgjLwruhBQkf+8ivEmrv6oppIXSOmnTkLhtox7tAAAAABJRU5ErkJggg==" />
                        </button>
                        <h1 className="mx-auto my-auto">{ name }</h1>
                    </div>
                    <div className="flex justify-center items-center w-5/6"><img className="w-1/2" src={url} /></div>
                </div>
            }
        </>
    )
}

export default File


