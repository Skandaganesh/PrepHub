  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { FaGoogle } from "react-icons/fa";
  import { auth, googleProvider, db } from "../../firebaseConfig";
  import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import BackgroundAnimation from "../../BackgroundAnimation";

  const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState("1");
    const [college, setCollege] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);
    
      if (isSignUp && password !== confirmPassword) {
        setMessage("Passwords do not match!");
        setLoading(false);
        return;
      }
    
      try {
        let userCredential;
        if (isSignUp) {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, "users", userCredential.user.uid), {
            name,
            email,
            year,
            college,
          });
          setMessage("Account created successfully!");
        } else {
          userCredential = await signInWithEmailAndPassword(auth, email, password);
        }
    
        navigate("/test");
      } catch (error) {
        const errorMsg = error.response?.data?.error?.message || error.message;
        alert(`Error: ${errorMsg}`);
        setMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    

    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const userDoc = await getDoc(doc(db, "users", result.user.uid));

        if (!userDoc.exists()) {
          await setDoc(doc(db, "users", result.user.uid), {
            name: result.user.displayName,
            email: result.user.email,
            year: "",
            college: "",
          });
        }
  alert("Google Login successful!");
        setMessage("Google Login successful!");
        navigate("/test");
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
          <form onSubmit={handleAuth}>
            {isSignUp && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Year of Study</label>
                  <select
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">College</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold transition mt-4">
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="text-center my-4">or</div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
          >
            <FaGoogle size={24} className="mr-2" />
            Sign in with Google
          </button>

          <p className="text-center mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button className="text-cyan-400 hover:underline ml-1" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    );
  };

  export default LoginPage;

