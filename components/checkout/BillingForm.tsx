"use client";

import InputField from "./InputField";
import SelectField from "@/components/checkout/SelectField";


const countries = ["Australia", "India", "United States", "Canada"];
const states = ["New South Wales", "Victoria", "Queensland", "South Australia"];

export default function BillingForm({ formData, handleInputChange }: any) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white font-bold">
          1
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Billing details</h2>
          <p className="text-sm text-gray-500">Enter your billing information.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
        <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} />
        <InputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
        <SelectField label="Country" name="country" value={formData.country} onChange={handleInputChange} options={countries} />
        <SelectField label="State" name="state" value={formData.state} onChange={handleInputChange} options={states} />
        <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} />
        <InputField label="Street Address" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} />
        <div className="md:col-span-2">
          <InputField label="Postcode" name="postcode" value={formData.postcode} onChange={handleInputChange} />
        </div>
      </div>
    </section>
  );
}