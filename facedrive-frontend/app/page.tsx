"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Home() {

  return (
    <body>
      <div className="flex flex-col justify-center items-center min-h-screen bg-for-gradient bg-gradient-to-tr from-bblue hover:animate-background-gradient">
        <div className="text-center mb-8">
          <img src="./facedrive_logo.png" alt="logo" className="w-3/5 mx-auto animate-slide-in-top" />
        </div>

        <div className="flex">
          <Link href="/login">
            <button className="hover:scale-110 hover:font-bold ease-in-out duration-300 border px-3 bg-lightblue text-white h-12 w-40 rounded-md mx-3 text-xl">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="hover:scale-110 hover:font-bold ease-in-out duration-300 border px-3 bg-lightblue text-white h-12 w-40 rounded-md mx-3 text-xl">
              Register
            </button>
          </Link>
        </div>
      </div>

    </body>
  )
}
