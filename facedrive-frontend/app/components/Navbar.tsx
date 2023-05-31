import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  loggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ loggedIn }) => {
    return(
        <>
        {loggedIn && <div className="flex justify-center shadow-md">
            <Link to="/drive/pages"><a href="#"><img src="../../facedrive_logo.png" className="w-64 py-3"/></a></Link>
        </div>}
        {!loggedIn && <div className="flex justify-center shadow-md">
            <img src="../../facedrive_logo.png" className="w-64 py-3"/>
        </div>}
        </>

    )
}

export default Navbar;