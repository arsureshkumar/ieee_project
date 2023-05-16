import './App.css';
import { RegisterPage } from "./pages/register";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


const App = () => {


  return (
    <Router>
    <div className="App">
      <body>
        <h1> Welcome to FaceDrive PogU </h1>
        <Link to="/register"> Register </Link>
        
      </body>
      <Routes>
        <Route path="/register" Component={RegisterPage} />
      </Routes>
      
 
    </div>
    </Router>
  );
}

export default App;
