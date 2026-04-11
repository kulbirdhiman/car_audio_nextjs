"use client";

import InputField from "./InputField";
import SelectField from "./SelectField";

const countries = ["Australia", "India", "United States", "Canada"];
const states = ["New South Wales", "Victoria", "Queensland", "South Australia"];

export default function ShippingForm({ formData, handleInputChange }: any) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white font-bold">
          2
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Shipping details</h2>
        </div>
      </div>

      <label className="flex gap-3 mb-4">
        <input type="checkbox" name="sameAsBilling" checked={formData.sameAsBilling} onChange={handleInputChange} />
        Same as billing
      </label>

      {!formData.sameAsBilling && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InputField label="First Name" name="shippingFirstName" value={formData.shippingFirstName} onChange={handleInputChange} />
          <InputField label="Last Name" name="shippingLastName" value={formData.shippingLastName} onChange={handleInputChange} />
          <InputField label="Email" name="shippingEmail" value={formData.shippingEmail} onChange={handleInputChange} />
          <InputField label="Phone" name="shippingPhone" value={formData.shippingPhone} onChange={handleInputChange} />
          <SelectField label="Country" name="shippingCountry" value={formData.shippingCountry} onChange={handleInputChange} options={countries} />
          <SelectField label="State" name="shippingState" value={formData.shippingState} onChange={handleInputChange} options={states} />
          <InputField label="City" name="shippingCity" value={formData.shippingCity} onChange={handleInputChange} />
          <InputField label="Street Address" name="shippingStreetAddress" value={formData.shippingStreetAddress} onChange={handleInputChange} />
        </div>
      )}
    </section>
  );
}