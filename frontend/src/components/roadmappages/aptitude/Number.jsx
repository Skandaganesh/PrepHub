import React from "react";
// import "./Numbers.css";

const Numbers = () => {
  return (
    <div className="container mx-auto p-10 bg-gray-800 text-white border border-gray-700   pl-6">
      <h1 className="text-4xl font-bold mb-6 text-center">What are Numbers?</h1>
      {/* <p className="text-sm text-gray-400 mb-8 text-center">Last Updated: 08 Jan, 2025</p> */}
      <p className="mb-6 text-lg">
        Numbers are symbols we use to count, measure, and describe things. They
        are everywhere in our daily lives and help us understand and organize
        the world.
      </p>
      
      <h2 className="text-3xl font-semibold mt-10 border-b border-gray-600 pb-3">History of Numbers</h2>
      <p className="mt-4 mb-6 text-lg">
        Numbers have been an essential part of human civilization since ancient times. Early societies, such as the Babylonians and Egyptians, developed numeral systems to count, trade, and measure time.
      </p>
      
      <h2 className="text-3xl font-semibold mt-10 border-b border-gray-600 pb-3">Classification of Numbers</h2>
      <p className="mt-4 mb-6 text-lg">Numbers can be categorized into different types based on their properties and usage.</p>
      
      {[
        { title: "Natural Numbers", description: "The set of positive whole numbers starting from 1. Example: 1, 2, 3, 4..." },
        { title: "Whole Numbers", description: "Includes all natural numbers along with zero. Example: 0, 1, 2, 3..." },
        { title: "Integers", description: "Whole numbers including negatives. Example: -3, -2, -1, 0, 1..." },
        { title: "Rational Numbers", description: "Numbers that can be expressed as fractions. Example: 1/2, 3/4, -5/6" },
        { title: "Irrational Numbers", description: "Numbers that cannot be written as simple fractions, such as π (3.14159...) and √2." },
        { title: "Real Numbers", description: "All rational and irrational numbers combined." },
        { title: "Imaginary Numbers", description: "Numbers that involve the square root of negative one (i). Example: √-1 = i" },
        { title: "Complex Numbers", description: "Numbers that combine real and imaginary parts. Example: 3 + 4i." }
      ].map((item, index) => (
        <div key={index} className="mt-6 mb-6">
          <h3 className="text-2xl font-semibold">{item.title}</h3>
          <p className="mt-2 text-lg">{item.description}</p>
        </div>
      ))}
      
      <h2 className="text-3xl font-semibold mt-10 border-b border-gray-600 pb-3">Operations on Numbers</h2>
      <ul className="list-disc list-inside ml-6 mb-6 text-lg">
        <li><strong>Addition (+)</strong>: 5 + 3 = 8</li>
        <li><strong>Subtraction (-)</strong>: 7 - 2 = 5</li>
        <li><strong>Multiplication (*)</strong>: 4 * 3 = 12</li>
        <li><strong>Division (/)</strong>: 10 ÷ 2 = 5</li>
      </ul>
      
      <h2 className="text-3xl font-semibold mt-10 border-b border-gray-600 pb-3">Types of Numbers</h2>
      <ul className="list-disc list-inside ml-6 mb-6 text-lg">
        <li><strong>Prime Numbers</strong>: 2, 3, 5, 7, 11</li>
        <li><strong>Composite Numbers</strong>: 4, 6, 8, 9, 10</li>
        <li><strong>Perfect Numbers</strong>: 6 (1 + 2 + 3)</li>
      </ul>
      
      <h2 className="text-3xl font-semibold mt-10 border-b border-gray-600 pb-3">Number Systems</h2>
      <ul className="list-disc list-inside ml-6 mb-6 text-lg">
        <li><strong>Binary (Base-2)</strong>: Uses two digits (0,1). Example: 101 (Binary) = 5 (Decimal)</li>
        <li><strong>Decimal (Base-10)</strong>: Uses ten digits (0-9). Example: 45</li>
        <li><strong>Hexadecimal (Base-16)</strong>: Uses digits 0-9 and letters A-F. Example: 1A (Hex) = 26 (Decimal)</li>
      </ul>
      
      <h2 className="text-3xl font-semibold mt-10 border-b border-gray-600 pb-3">Properties of Numbers</h2>
      <ul className="list-disc list-inside ml-6 mb-6 text-lg">
        <li><strong>Commutative Property</strong>: a + b = b + a, a × b = b × a</li>
        <li><strong>Associative Property</strong>: (a + b) + c = a + (b + c), (a × b) × c = a × (b × c)</li>
        <li><strong>Distributive Property</strong>: a × (b + c) = a × b + a × c</li>
      </ul>
    </div>
  );
};

export default Numbers;
