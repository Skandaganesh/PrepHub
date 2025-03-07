import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "../../firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import BackgroundAnimation from "../../BackgroundAnimation";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful!");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage("Google Login successful!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black p-4">
      <BackgroundAnimation />
      <div className="bg-white/10 backdrop-blur-sm border-2 bg-opacity-75 border-cyan-500 text-white p-8 rounded-2xl shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignUp ? "Create an Account" : "Login to PrepHub"}
        </h2>
<<<<<<< HEAD
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
=======
        <form onSubmit={handleAuth}>
>>>>>>> e64febd (feat:test firebase)
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-300 to-blue-700 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        {message && <p className="text-center mt-4 text-red-400">{message}</p>}
        <div className="text-center my-4">or</div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          <FaGoogle size={24} className="mr-2" />
          Sign in with Google
        </button>
        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
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
