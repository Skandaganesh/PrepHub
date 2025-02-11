import React, { useState } from "react";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundAnimation from "../../BackgroundAnimation";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Message Sent! We will get back to you soon.");
  };

  return (
    <>
     <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
       
        <BackgroundAnimation/>
      {/* <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1> */}

      {/* Contact Form */}
      {/* <div className="bg-black p-6 rounded-lg border-2 border-white shadow-lg w-full max-w-lg"> */}
        <fieldset className=" p-6 rounded-lg border-2 border-white shadow-lg w-full max-w-lg">
            <legend className="text-2xl font-bold text-white mx-6 px-4">Contact Us</legend>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 rounded-md border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-md border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 rounded-md border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold p-3 rounded-md hover:opacity-80 transition"
          >
            Send Message
          </button>
        </form>
        </fieldset>
      {/* </div> */}

      {/* Additional Sections */}
      <div className="mt-8 text-white text-center">
        <h2 className="text-xl font-semibold">Follow Us</h2>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-white text-2xl hover:opacity-80"><FaGoogle /></a>
          <a href="#" className="text-white text-2xl hover:opacity-80"><FaGithub /></a>
          <a href="#" className="text-white text-2xl hover:opacity-80"><FaLinkedin /></a>
        </div>

        {/* <h2 className="mt-6 text-xl font-semibold">FAQs</h2>
        <p className="text-gray-200 mt-2">
          Need help? Check our <a href="#" className="underline text-white">FAQs</a> or <a href="#" className="underline text-white">Support Center</a>.
        </p> */}
      </div>
    
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
