import React from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import BreweryLogo from '../images/BreweryLogo.png';
import BeerImage from '../images/BeerImage.png';

const SharedLayout = () => {
  const { logoutUser } = useAppContext();

  return (
    <main className="bg-gradient-to-br from-teal-400 to-blue-500 min-h-screen">
      <header className="top-0 w-full flex justify-between z-10 bg-gradient-to-r from-teal-400 to-blue-500 shadow-md transform translate-y-0 hover:translate-y-1 transition-transform duration-300 ease-in-out">
        <a className="flex items-center py-2" href="" target="_blank">
          <div className="h-24 w-24 flex justify-center items-center ">
            <img id="header-img" className="h-20" src={BreweryLogo} alt="Brewery" />
          </div>
        </a>
        <h1 className="p-8 text-2xl md:text-4xl font-serif font-bold uppercase leading-tight transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out text-black">Brewery Review System</h1>
        <button
          className="bg-black text-white mt:mt-9 md:m-9 inline-block px-2 py-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-sky-500 "
          onClick={() => logoutUser()}
        >
          Logout
        </button>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;
