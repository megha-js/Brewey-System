import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import Loader from "../components/Loader";
import { useAppContext } from "../context/appContext";

const Auth = () => {
  const navigate = useNavigate();
  const { setupUser, isLoading } = useAppContext();
  const [authType, setAuthType] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (!validator.isEmail(email)) {
        toast.error("Please provide correct email");
        return;
      }
      if (password?.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }
      if (authType === "signup") {
        setupUser(formData, "register", "Sign Up successful");
      } else {
        setupUser(formData, "login", "Sign In successful");
      }
      await sleep(3000);
      navigate("/");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }

  const { user } = useAppContext();
  if (user) {
    return <Navigate to="/" />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="px-6 py-8 w-full max-w-md bg-white border border-gray-300 rounded-3xl shadow-2xl">
        <div className="w-full h-full">
          <div className="font-semibold text-3xl text-center text-gray-800 mb-6">
            {authType === "signup" ? "Sign Up" : "Sign In"}
          </div>
          <form
            className="flex flex-col items-center w-full mt-2 space-y-6"
            onSubmit={onSubmit}
          >
            {authType === "signup" && (
              <div className="flex flex-col items-center w-full mb-4">
                <label
                  className="text-left w-full text-gray-700 text-lg font-medium"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="mt-2 w-full h-12 border border-gray-300 rounded-full transition duration-150 ease-in-out focus:ring-2 focus:ring-teal-500 focus:outline-none p-4 shadow-md"
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required={true}
                  value={name}
                  onChange={onChange}
                />
              </div>
            )}
            <div className="flex flex-col items-center w-full mb-4">
              <label
                className="text-left w-full text-gray-700 text-lg font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-2 w-full h-12 border border-gray-300 rounded-full transition duration-150 ease-in-out focus:ring-2 focus:ring-teal-500 focus:outline-none p-4 shadow-md"
                type="email"
                id="email"
                placeholder="Enter Email Address"
                required={true}
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="relative flex flex-col items-center w-full mb-4">
              <label
                className="text-left w-full text-gray-700 text-lg font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mt-2 w-full h-12 border border-gray-300 rounded-full transition duration-150 ease-in-out focus:ring-2 focus:ring-teal-500 focus:outline-none p-4 shadow-md"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required={true}
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-10 text-xl text-gray-700 cursor-pointer"
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-10 text-xl text-gray-700 cursor-pointer"
                />
              )}
            </div>

            <button
              disabled={isLoading}
              className="mt-8 w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 text-sm font-medium uppercase rounded-full shadow-lg hover:from-teal-600 hover:to-blue-600 transition duration-150 ease-in-out hover:shadow-xl active:bg-teal-700 shadow-md shadow-md transform translate-y-0 hover:translate-y-1 transition-transform duration-300 ease-in-out"
              type="submit"
            >
              {isLoading ? (
                <Loader textColor="text-gray-300" loaderColor="fill-teal-500" />
              ) : authType === "signup" ? "Sign Up" : "Sign In"}
            </button>

            <div className="mt-6 flex flex-col md:flex-row items-center w-full">
              <div className="flex items-center font-light text-base text-gray-500">
                {authType === "signup"
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <span
                  className="text-teal-500 ml-2 font-medium cursor-pointer hover:underline"
                  onClick={() =>
                    setAuthType((prev) =>
                      prev === "signup" ? "signin" : "signup"
                    )
                  }
                >
                  {authType === "signup" ? "Sign In" : "Sign Up"}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
