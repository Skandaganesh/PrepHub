import { useState } from "react";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div  href="http://localhost:5173/" className="text-2xl font-bold cursor-pointer" >
      PrepHub
    </div>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Items */}
        <ul
         className={`md:flex md:items-center md:space-x-6 fixed md:relative bg-gray-900 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 transition-all duration-300 ease-in-out z-50 ${
            isOpen ? "flex flex-col" : "hidden"
          } md:flex-row md:flex`}
        >
          <li>
            <a
              href="home"
              className="block py-2 px-4 hover:text-blue-500 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="explore"
              className="block py-2 px-4 hover:text-blue-500 transition"
            >
              Explore
            </a>
          </li>
          <li>
            <a
              href="test"
              className="block py-2 px-4 hover:text-blue-500 transition"
            >
              Daily Tests
            </a>
          </li>
          <li>
            <a
              href="contact"
              className="block py-2 px-4 hover:text-blue-500 transition"
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Profile Icon */}
        <div className="hidden md:block">
          <User size={28} className="hover:text-blue-500 transition cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
