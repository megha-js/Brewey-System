import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import BreweryLogo from '../images/BreweryLogo.png';
import BeerImage from '../images/BeerImage.png';

const Landing = () => {
  const { user } = useAppContext();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="text-[#090b08] font-raleway">
      <header className="fixed top-0 w-full flex justify-between z-10 bg-gradient-to-r from-teal-400 to-blue-500 shadow-md shadow-md transform translate-y-0 hover:translate-y-1 transition-transform duration-300 ease-in-out">
        <a className="flex items-center py-2 " href="" target="_blank">
          <img id="header-img" className="h-24" src={BreweryLogo} alt="Brewery" />
        </a>
        <h1 className="p-8 text-2xl md:text-4xl font-serif font-bold uppercase leading-tight transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out text-black">Brewery Review System</h1>
        <Link to="/auth" className="bg-black text-white mt:mt-9 md:m-9 inline-block px-2 py-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-blue-500">
          Get Started
        </Link>
      </header>

      <div className="hero h-screen flex items-center bg-gradient-to-r from-teal-400 to-blue-500 bg-cover bg-right-bottom bg-no-repeat">
        <div className="p-8 md:p-16 text-left md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold uppercase leading-tight">
            Brewery<br />Review Based on your Experience!!
          </h1>
          <Link to="/auth" className="bg-black text-white mt:mt-9 md:m-9 inline-block px-2 py-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-blue-500">
            Get Started
          </Link>
        </div>
        <div className="image w-full md:w-1/2">
          <img className="w-auto h-auto" src={BeerImage} alt="Brewery" />
        </div>
      </div>
    </div>
  );
};

export default Landing;