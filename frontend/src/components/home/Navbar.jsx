import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { signOut, updatePassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchUserName = async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };

    const checkUser = () => {
      const user = auth.currentUser;
      fetchUserName(user);
    };

    checkUser();
    intervalId = setInterval(checkUser, 5000);

    return () => clearInterval(intervalId);
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const handleChangePassword = async () => {
    const user = auth.currentUser;
    if (user && user.providerData.some((p) => p.providerId === "password")) {
      try {
        await updatePassword(user, newPassword);
        alert("Password updated successfully!");
        setShowPasswordModal(false);
        setNewPassword("");
      } catch (error) {
        console.error("Password Change Error:", error.message);
        alert("Failed to update password.");
      }
    } else {
      alert("Google users cannot change password here.");
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold cursor-pointer">PrepHub</div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul
          className={`md:flex md:items-center md:space-x-6 fixed md:relative bg-gray-900 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 transition-all duration-300 ease-in-out z-50 ${
            isOpen ? "flex flex-col" : "hidden"
          } md:flex-row md:flex`}
        >
          <li>
            <a href="home" className="block py-2 px-4 hover:text-blue-500 transition">
              Home
            </a>
          </li>
          <li>
            <a href="explore" className="block py-2 px-4 hover:text-blue-500 transition">
              Explore
            </a>
          </li>
          <li>
            <a href="test" className="block py-2 px-4 hover:text-blue-500 transition">
              Daily Tests
            </a>
          </li>
           <li>
            <a href="internship" className="block py-2 px-4 hover:text-blue-500 transition">
              Internship
            </a>
          </li>
          <li>
            <a href="contact" className="block py-2 px-4 hover:text-blue-500 transition">
              Contact Us
            </a>
          </li>
        </ul>

        {userName && <div className="relative z-50">
          <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center space-x-2">
            <User size={28} className="hover:text-blue-500 transition cursor-pointer" />
          </button>

          { userMenuOpen  &&  (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-600 p-2">
              {userName && <p className="text-center text-l mb-2">Hi , {userName} </p>}
              <button
                onClick={() => setShowPasswordModal(true)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>}
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-white">Change Password</h2>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowPasswordModal(false)} className="bg-red-500 px-4 py-2 rounded text-white mr-2">
                Cancel
              </button>
              <button onClick={handleChangePassword} className="bg-blue-500 px-4 py-2 rounded text-white">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
