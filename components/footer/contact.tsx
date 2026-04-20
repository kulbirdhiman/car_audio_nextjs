"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Contact: React.FC = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors: any = {};

    if (!values.firstName) newErrors.firstName = "First name is required";
    if (!values.lastName) newErrors.lastName = "Last name is required";
    if (!values.email) newErrors.email = "Email is required";
    if (!values.phone) newErrors.phone = "Phone number is required";
    if (!values.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Form Data:", values);

    toast.success("Form submitted successfully!");

    // reset form
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Contact Form</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap">
        
        {/* First Name */}
        <div className="w-1/2 p-3">
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full border-b border-gray-900 focus:outline-none focus:border-green-500"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="w-1/2 p-3">
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border-b border-gray-900 focus:outline-none focus:border-green-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div className="w-1/2 p-3">
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-b border-gray-900 focus:outline-none focus:border-green-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="w-1/2 p-3">
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border-b border-gray-900 focus:outline-none focus:border-green-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Message */}
        <div className="w-full p-3">
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Comment your message"
            rows={4}
            className="w-full border-b border-gray-900 focus:outline-none focus:border-green-500"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        {/* Submit */}
        <div className="w-full p-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;