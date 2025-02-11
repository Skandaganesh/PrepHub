import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Tagline */}
        <div>
          <h2 className="text-2xl font-bold">PrepHub</h2>
          <p className="text-sm mt-2">Your ultimate placement preparation platform.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">About</a></li>
            <li><a href="#" className="hover:text-gray-400">Resources</a></li>
            <li><a href="#" className="hover:text-gray-400">Mock Tests</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        {/* Additional Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">More</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gray-400">Support</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaGithub size={24} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} PrepHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
