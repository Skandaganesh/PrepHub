import { useState } from "react";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import BackgroundAnimation from "../../BackgroundAnimation";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black p-4">
      <BackgroundAnimation />
      <div className="bg-white/10 backdrop-blur-sm border-2 bg-opacity-75 border-bg-gradient-to-r from-cyan-300 to-blue-700 text-white p-8 rounded-2xl shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignUp ? "Create an Account" : "Login to PrepHub"}
        </h2>
        <form>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-cyan-300 to-blue-700"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-cyan-300 to-blue-700"
              required
            />
          </div>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-cyan-300 to-blue-700"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-cyan-300 to-blue-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-300 to-blue-700 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition mt-4"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="text-center my-4">or</div>
        <div className="flex justify-center space-x-4">
          <button className="p-3 bg-gradient-to-r from-cyan-300 to-blue-700 rounded-full hover:bg-gray-600">
            <FaGoogle size={24} />
          </button>
          <button className="p-3 bg-gradient-to-r from-cyan-300 to-blue-700 rounded-full hover:bg-gray-600">
            <FaGithub size={24} />
          </button>
          <button className="p-3 bg-gradient-to-r from-cyan-300 to-blue-700 rounded-full hover:bg-gray-600">
            <FaLinkedin size={24} />
          </button>
        </div>
        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"} 
          <button
            className="text-cyan-400 hover:underline ml-1"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
