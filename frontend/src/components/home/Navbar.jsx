import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { signOut, updatePassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
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
    intervalId = setInterval(checkUser, 2000);

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
      <Link to="/home" className="block">
        <div className="text-3xl font-extrabold tracking-tight hover:scale-110 transition-transform duration-300">
          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">Prep</span>
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
            Hub
          </span>
        </div>
      
      </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

          {/* <ul
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
          </ul> */}
     <ul
  className={`fixed md:relative bg-gray-900 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 transition-all duration-300 ease-in-out z-50 ${
    isOpen ? "flex flex-col items-start px-6 py-4 space-y-3" : "hidden"
  } md:flex md:flex-row md:items-center md:space-x-6 md:space-y-0`}
>
  {[
    { href: "home", label: "Home" },
    { href: "internship", label: "Opportunities" },
    { href: "explore", label: "Explore" },
    { href: "test", label: "Daily Tests" },
    { href: "contact", label: "Contact Us" },
  ].map((item) => (
    <li key={item.href} className="group w-full md:w-auto">
      <a
        href={item.href}
        className="block w-full py-2 px-4 text-white hover:text-white font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 hover:backdrop-blur-sm hover:border hover:border-white/20 hover:shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 relative overflow-hidden group-hover:translate-y-[-2px]"
      >
        <span className="relative z-10">{item.label}</span>
        <div className="absolute bg-gradient-to-r from-transparent via-pink-300/10 to-transparent"></div>
      </a>
    </li>
  ))}

  {!userName && (
    <li className="w-full md:w-auto">
      <a
        href="/login"
        className="block w-full py-2 px-4 bg-red-600 text-white font-medium rounded-xl text-center transition hover:bg-red-700 hover:scale-105"
      >
        Login
      </a>
    </li>
  )}
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
// "use client"

// import { useState, useEffect } from "react"
// import { Menu, X, User } from "lucide-react"
// import { signOut, updatePassword } from "firebase/auth"
// import { auth, db } from "../../firebaseConfig"
// import { doc, getDoc } from "firebase/firestore"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [userMenuOpen, setUserMenuOpen] = useState(false)
//   const [showPasswordModal, setShowPasswordModal] = useState(false)
//   const [newPassword, setNewPassword] = useState("")
//   const [userName, setUserName] = useState("")

//   useEffect(() => {
//     let intervalId
//     const fetchUserName = async (user) => {
//       if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid))
//         if (userDoc.exists()) {
//           setUserName(userDoc.data().name)
//         }
//       }
//     }

//     const checkUser = () => {
//       const user = auth.currentUser
//       fetchUserName(user)
//     }

//     checkUser()
//     intervalId = setInterval(checkUser, 5000)
//     return () => clearInterval(intervalId)
//   }, [])

//   const handleLogout = async () => {
//     try {
//       await signOut(auth)
//       window.location.href = "/"
//     } catch (error) {
//       console.error("Logout Error:", error.message)
//     }
//   }

//   const handleChangePassword = async () => {
//     const user = auth.currentUser
//     if (user && user.providerData.some((p) => p.providerId === "password")) {
//       try {
//         await updatePassword(user, newPassword)
//         alert("Password updated successfully!")
//         setShowPasswordModal(false)
//         setNewPassword("")
//       } catch (error) {
//         console.error("Password Change Error:", error.message)
//         alert("Failed to update password.")
//       }
//     } else {
//       alert("Google users cannot change password here.")
//     }
//   }

//   return (
//     <nav className="bg-gradient-to-r from-slate-800 via-purple-900 to-slate-900 backdrop-blur-lg border-b border-white/10 shadow-2xl sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex justify-between items-center">
//           {/* Rainbow Logo */}
//           <div className="text-3xl font-bold cursor-pointer bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 drop-shadow-lg">
//             PrepHub
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
//             >
//               {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
//             </button>
//           </div>

//           {/* Navigation Links */}
//           <ul
//             className={`md:flex md:items-center md:space-x-2 fixed md:relative  md:bg-transparent backdrop-blur-lg md:backdrop-blur-none w-full md:w-auto left-0 top-[72px] md:top-0 transition-all duration-500 ease-in-out z-40  md:border-none ${
//               isOpen ? "flex flex-col py-6 px-4" : "hidden"
//             } md:flex-row md:flex md:py-0 md:px-0`}
//           >
//             {[
//               { href: "home", label: "Home" },
//               { href: "explore", label: "Explore" },
//               { href: "test", label: "Daily Tests" },
//               { href: "internship", label: "Opportunities" },
//               { href: "contact", label: "Contact Us" },
//             ].map((item, index) => (
//               <li key={item.href} className="group">
//                 <a
//                   href={item.href}
//                   className="block py-3 px-6 md:py-2 md:px-4 text-white/90 hover:text-white font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:backdrop-blur-sm hover:border hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 relative overflow-hidden group-hover:translate-y-[-2px]"
//                 >
//                   <span className="relative z-10">{item.label}</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* User Menu */}
//           {userName && (
//             <div className="relative z-50">
//               <button
//                 onClick={() => setUserMenuOpen(!userMenuOpen)}
//                 className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-blue-500/25"
//               >
//                 <User size={24} className="text-white hover:text-blue-300 transition-colors duration-300" />
//               </button>

//               {userMenuOpen && (
//                 <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-white/20 p-3 transform transition-all duration-300 hover:shadow-blue-500/10">
//                   {userName && (
//                     <p className="text-center text-lg mb-3 font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                       Hi, {userName}!
//                     </p>
//                   )}
//                   <button
//                     onClick={() => setShowPasswordModal(true)}
//                     className="block w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 rounded-xl font-medium hover:translate-x-1"
//                   >
//                     Change Password
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300 rounded-xl font-medium hover:translate-x-1 text-red-300 hover:text-red-200"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Password Change Modal */}
//       {showPasswordModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100]">
//           <div className="bg-gradient-to-br from-slate-900 to-purple-900 p-8 rounded-2xl shadow-2xl w-96 border border-white/20 backdrop-blur-xl">
//             <h2 className="text-2xl font-bold mb-6 text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Change Password
//             </h2>
//             <input
//               type="password"
//               className="w-full p-4 rounded-xl bg-slate-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//             />
//             <div className="flex justify-end mt-6 space-x-3">
//               <button
//                 onClick={() => setShowPasswordModal(false)}
//                 className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleChangePassword}
//                 className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }
// "use client"

// import { useState, useEffect } from "react"
// import { Menu, X, User } from "lucide-react"
// import { signOut, updatePassword } from "firebase/auth"
// import { auth, db } from "../../firebaseConfig"
// import { doc, getDoc } from "firebase/firestore"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [userMenuOpen, setUserMenuOpen] = useState(false)
//   const [showPasswordModal, setShowPasswordModal] = useState(false)
//   const [newPassword, setNewPassword] = useState("")
//   const [userName, setUserName] = useState("")

//   useEffect(() => {
//     let intervalId
//     const fetchUserName = async (user) => {
//       if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid))
//         if (userDoc.exists()) {
//           setUserName(userDoc.data().name)
//         }
//       }
//     }
   
//     const checkUser = () => {
//       const user = auth.currentUser
//       fetchUserName(user)
//     }

//     checkUser()
//     intervalId = setInterval(checkUser, 5000)
//     return () => clearInterval(intervalId)
//   }, [])

//   const handleLogout = async () => {
//     try {
//       await signOut(auth)
//       window.location.href = "/"
//     } catch (error) {
//       console.error("Logout Error:", error.message)
//     }
//   }

//   const handleChangePassword = async () => {
//     const user = auth.currentUser
//     if (user && user.providerData.some((p) => p.providerId === "password")) {
//       try {
//         await updatePassword(user, newPassword)
//         alert("Password updated successfully!")
//         setShowPasswordModal(false)
//         setNewPassword("")
//       } catch (error) {
//         console.error("Password Change Error:", error.message)
//         alert("Failed to update password.")
//       }
//     } else {
//       alert("Google users cannot change password here.")
//     }
//   }

//   return (
//     <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-slate-900 backdrop-blur-lg border-b border-white/10 shadow-2xl sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex justify-between items-center">
//           {/* PrepHub Logo */}
//           {/* <div className="text-3xl font-bold cursor-pointer bg-gradient-to-r from-pink-400 via-white to-pink-500 bg-clip-text text-transparent hover:from-pink-300 hover:via-pink-100 hover:to-pink-400 hover:scale-105 transition-all duration-300 drop-shadow-lg">
//             PrepHub
//           </div> */}
//            <div className="text-3xl font-bold cursor-pointer bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 drop-shadow-lg"
//             onClick={() => navigate('/')}>
//             PrepHub
//          </div>

//           {/* Desktop Navigation Links */}
//           <ul className="hidden md:flex md:items-center md:space-x-6">
//             {[
//               { href: "home", label: "Home" },
//               { href: "internship", label: "Opportunities" },
//               { href: "explore", label: "Explore" },
//               { href: "test", label: "Daily Tests" },
            
//               { href: "contact", label: "Contact Us" },
//             ].map((item, index) => (
//               <li key={item.href} className="group">
//                 <a
//                   href={item.href}
//                   className="py-2 px-4 text-white hover:text-white font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 hover:backdrop-blur-sm hover:border hover:border-white/20 hover:shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 relative overflow-hidden group-hover:translate-y-[-2px]"
//                 >
//                   <span className="relative z-10">{item.label}</span>
//                   <div className="absolute  bg-gradient-to-r from-transparent via-pink-300/10 to-transparent "></div>
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Right side - Mobile Menu Button and User Menu */}
//           <div className="flex items-center space-x-4">
//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
//               >
//                 {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
//               </button>
//             </div>

//             {/* User Menu */}
//             {userName && (
//               <div className="relative z-50">
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center space-x-2 p-2 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-pink-400/40 hover:shadow-lg hover:shadow-pink-500/25"
//                 >
//                   <User size={24} className="text-white/70 hover:text-pink-300 transition-colors duration-300" />
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-white/20 p-3 transform transition-all duration-300 hover:shadow-pink-500/10">
//                     {userName && (
//                       <p className="text-center text-lg mb-3 font-medium bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent">
//                         Hi, {userName}!
//                       </p>
//                     )}
//                     <button
//                       onClick={() => setShowPasswordModal(true)}
//                       className="block w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 rounded-xl font-medium hover:translate-x-1"
//                     >
//                       Change Password
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300 rounded-xl font-medium hover:translate-x-1"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div
//           className={`md:hidden fixed left-0 top-[72px] w-full bg-gradient-to-b from-slate-800/95 to-purple-900/95 backdrop-blur-lg border-b border-white/10 transition-all duration-500 ease-in-out z-40 ${
//             isOpen ? "flex flex-col py-6 px-4" : "hidden"
//           }`}
//         >
//           <ul className="w-full space-y-2">
//             {[
//               { href: "home", label: "Home" },
//               { href: "explore", label: "Explore" },
//               { href: "test", label: "Daily Tests" },
//               { href: "internship", label: "Opportunities" },
//               { href: "contact", label: "Contact Us" },
//             ].map((item, index) => (
//               <li key={item.href} className="group">
//                 <a
//                   href={item.href}
//                   className="block py-3 px-6 text-white/90 hover:text-white font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 hover:backdrop-blur-sm hover:border hover:border-white/20 hover:shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 relative overflow-hidden"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <span className="relative z-10">{item.label}</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-300/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Password Change Modal */}
//       {showPasswordModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100]">
//           <div className="bg-gradient-to-br from-slate-900 to-purple-900 p-8 rounded-2xl shadow-2xl w-96 max-w-[90vw] border border-white/20 backdrop-blur-xl">
//             <h2 className="text-2xl font-bold mb-6 text-white bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent">
//               Change Password
//             </h2>
//             <input
//               type="password"
//               className="w-full p-4 rounded-xl bg-slate-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//             />
//             <div className="flex justify-end mt-6 space-x-3">
//               <button
//                 onClick={() => setShowPasswordModal(false)}
//                 className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleChangePassword}
//                 className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }
