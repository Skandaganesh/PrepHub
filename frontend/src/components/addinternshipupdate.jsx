import React, { useState } from "react";

const AddInternshipUpdate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ctc: "",
    link: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/internships/addinternshipopening`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to add internship");

      setMessage("✅ Internship added successfully!");
      setFormData({ title: "", description: "", ctc: "", link: "", location: "" });
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center items-center">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Internship Opening</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
          <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
          <Input label="CTC (optional)" name="ctc" value={formData.ctc} onChange={handleChange} />
          <Input label="Application Link" name="link" value={formData.link} onChange={handleChange} />
          <Input label="Location" name="location" value={formData.location} onChange={handleChange} />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg transition hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Submitting..." : "➕ Add Internship"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={name !== "ctc"}
      className="w-full p-2 bg-gray-800 rounded border border-gray-700"
    />
  </div>
);

export default AddInternshipUpdate;
