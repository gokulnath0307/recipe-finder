"use client";

import { useState } from "react";
export default function BMIForm({ onRecipeGenerated }) {
  const [form, setForm] = useState({ name: "", age: "", weight: "", height: "", isDiabetes: false, dietType: "", userInput: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onRecipeGenerated(form);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md md:max-w-2xl lg:max-w-3xl">
      <h2 className="text-2xl font-bold mb-6 text-center">BMI & AI Recipe Generator</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="block">
          <label>Name</label>
          <input className="border p-3 w-full rounded-md" name="name" placeholder="Name" onChange={handleChange} required />
        </div>
        <div className="block">
          <label>Age</label>
          <input className="border p-3 w-full rounded-md" type="number" name="age" placeholder="Age" onChange={handleChange} required />
        </div>
        <div className="block">
          <label>Weight</label>
          <input
            className="border p-3 w-full rounded-md"
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            required
          />
        </div>
        <div className="block">
          <label>Height</label>
          <input
            className="border p-3 w-full rounded-md"
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            required
          />
        </div>
        <div className="block">
          <label>Diet Type</label>
          <select className="border p-3 w-full rounded-md" name="dietType" onChange={handleChange} required>
            <option hidden value="">
              Select Diet Type
            </option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Keto">Keto</option>
            <option value="Mediterranean">Mediterranean</option>
          </select>
        </div>
        
        <div className="block">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isDiabetes" onChange={handleChange} className="rounded" />
            <span>Do you have diabetes?</span>
          </label>
        </div>
        <div className="block">
        <label>Prepare</label>
          <input
            className="border p-3 w-full rounded-md"
            name="userInput"
            placeholder="What do you want to cook?"
            onChange={handleChange}
            required
          />
        </div>
        <div className="block">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md w-full transition duration-300">
            Register & Generate Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
