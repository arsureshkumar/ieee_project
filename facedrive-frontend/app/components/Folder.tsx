import React from 'react';

interface FolderProps{
    name: String
}

const Folder: React.FC<FolderProps> = ({ name }) => {
    return(
        <>
            <hr className="mt-3 w-98 mx-auto bg-lightblue"/>
            <div className="flex justify-items-start ml-10 mt-3 mr-5 mb-0">
                <div className="w-10">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwUlEQVR4nO2XvQrCQBCE7+1SpBEES1/GRvAfLHwBSxuLlGKnogQbi4CyD6DFImmEcCPWIl4Cx10xA1PfxzL7c8ZQVARK+ju4Oh3sR0EAs6v969Xlhc48L9PhYRwlYBYKMqkB+PEyL9GaHKs60WjiRoCz7R3t6Qm99Q3Fo4Ko9eIvQFd3F2dsiqc3MPkF6PtBIaCygmAGhU2i4ceLcA4qK2iD50+4i5UVtMygsEmUYwb8kwg3iXIXw/lYiNGGokx4vQEEQCyDq0MB7QAAAABJRU5ErkJggg==" />
                </div>
                <h2 className="ml-5 my-auto">{name}</h2>
            </div>
        </>
    )
}

export default Folder;