import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  loggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ loggedIn }) => {
    return(
        <>
        {loggedIn && <div className="flex justify-center shadow-md">
            <Link href="/drive/pages"><img src="../../facedrive_logo.png" className="w-64 py-3"/></Link>
        </div>}
        {!loggedIn && <div className="flex justify-center shadow-md">
            <img src="../../facedrive_logo.png" className="w-64 py-3"/>
        </div>}
        </>

    )
}

export default Navbar;