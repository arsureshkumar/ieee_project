import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  loggedIn: boolean;
}


const Navbar: React.FC<NavbarProps> = ({ loggedIn }) => {


    return(
        <>
        {loggedIn && <div className="flex justify-between shadow-md">
            <Link href="../drive"><img src="../../facedrive_logo.png" className="w-64 py-3"/></Link>
            <div className="my-auto mr-5 px-12 py-3 rounded-full bg-lightblue text-white flex justify-center">
            <img className="w-8" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACqUlEQVR4nO2Yy2sUQRDGf7tGyMGDnr3pyceuKyqKV48aDIIiyYoiipegeFAR8YGYZFGiZ4VVNP4J3pIseBB8gC54VS/GB5KgeBDja6WhBpomPTsz6e4ZQj4oGPox8309VV3VDUtYXCgBW4FDwFngjDxvkb7CYhUwAkwDHYu9B4aBlRQMA8BsDHHTZoCDFATXgH8pyEem5lzNm/zpDMRNG8qL/HbgjwMBvyXog6PlgHxkj0OT3+mQfEdsR0gBNzwIaIQU8MKDgGchBXz2IOBDSAFzHgT8DCngowcB0yEFPPcg4GlIAQ0PAoZDZ2HXArYRGBMOybfIAeqA8ssB+TmgRk446kDACXLGhYzngb/AeQqCfSmz8ydgLwXDCuAS8DaG+BvgoowtNDYAB4BTYvulLQ5loC5W6NsLG+ranxoM+eEeWd26HPDvAo8kT6jy4Ik83+zyniuaAPXsDcuBXcAtIfgjYeAekfl9QFvKEeU23QSUZWxb5mbGWmAM+JJxv4+SVVtrawJV4CHwTWtXz+PS19TaX2Yhvhp4ILcHC0lYfQ4KwdG05A8D3x1kW2VTsruUjVXtGDd2M5a+puFysVgmPt5xZCo33AY2yvurRv+ktEXYLGdkfUwlzcpfd0he7Uq9xvvHtf4J2clM9Mhfi8bdT0q+3/HK92pJ6pyYHrDVGC6bjMCO5luTnWp87VCAchszSZk+3w22W+/BEDduwQUccywgcqGSfLAhltSFaoYLRfMHbC502bEAZfe6BPFkTBC30gaxns5d2jvgDrDGso1OGcfK2jy339U8BUTbZZJENruQRDbkUcDuEKXEOgc1j83Unj5fMVeRWksP7K/SVslSzJ30JEIvp1/JaiYtp0eF/B4SYr0IaTi040U50Cy6I6UrlIS4NUktgYLiP7RtdqOxeIFzAAAAAElFTkSuQmCC"></img>
            <button className="pl-2">Settings</button>
            </div>
        </div>}
        {!loggedIn && <div className="flex justify-center shadow-md">
            <img src="../../facedrive_logo.png" className="w-64 py-3"/>
        </div>}
        </>

    )
}

export default Navbar;