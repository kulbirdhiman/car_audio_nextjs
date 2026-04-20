const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shipping & Delivery Policy</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">1. Shipping & Delivery</h2>

      <h3 className="text-xl font-semibold text-gray-700 mt-4">Delivery Information</h3>
      <p className="text-gray-700">The delivery cost will depend on your address as well as the size, and weight of the products you choose. Our website will automatically calculate the delivery cost for your order after you have filled in your address on the checkout page.</p>

      <ul className="list-disc list-inside text-gray-700 mt-3">
        <li>We use couriers to deliver all of our orders. We cannot deliver items to an unattended address.</li>
        <li>To receive your order as soon as possible, please make sure to fill in all the required information at checkout.</li>
        <li>A signature is required at the time of delivery. If no one is available, a card will be left, and the parcel will be rerouted to the nearest courier depot. Additional re-delivery fees may apply.</li>
        <li>We recommend using a delivery address that is staffed during business hours.</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-700 mt-4">Track & Trace</h3>
      <p className="text-gray-700">Track your order using our <strong>Track My Order</strong> feature by entering your order ID. It may take up to 24 hours for tracking updates to appear.</p>

      <p className="text-gray-700">For any concerns, contact our customer service team via web chat or our online enquiry form.</p>

      <h3 className="text-xl font-semibold text-gray-700 mt-4">Bulky Items</h3>
      <p className="text-gray-700">"Bulky" items may incur additional fees based on size, weight, or delivery location. If unsure, please contact our customer service team for clarification.</p>

      <h3 className="text-xl font-semibold text-gray-700 mt-4">Delivery Expectations</h3>

      <h4 className="text-lg font-medium text-gray-700 mt-2">Delivery Timeframes</h4>
      <p className="text-gray-700">Orders are dispatched within 0–2 business days. Estimated delivery time is 3–15 business days after dispatch depending on your location. Deliveries occur during business hours, Monday to Friday. Severe weather and service disruptions may affect timelines.</p>

      <h4 className="text-lg font-medium text-gray-700 mt-2">Reasons for Order Delays</h4>
      <ul className="list-disc list-inside text-gray-700">
        <li>Incorrect or incomplete address during checkout</li>
        <li>No one available to sign for the parcel</li>
        <li>Incorrect payment details</li>
        <li>Order verification delays</li>
        <li>High demand or supply from regional stock</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-700 mt-4">Express Shipping</h3>
      <p className="text-gray-700 font-medium">Currently, we are not offering express shipping. We apologise for any inconvenience.</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">2. Where We Ship</h2>
      <p className="text-gray-700">We ship not only within Australia, but also to the United States, New Zealand, Poland, and more. Check available options on the Cart page or chat with our customer care team.</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">3. Return & Refund</h2>

      <h3 className="text-xl font-semibold text-gray-700 mt-4">Return Policy</h3>
      <p className="text-gray-700">Items can be returned within 30 days of delivery. To qualify for a return:</p>
      <ul className="list-disc list-inside text-gray-700">
        <li>Provide valid proof of purchase</li>
        <li>Goods must be in original, unopened, re-sellable condition</li>
        <li>Accompanied by original receipt</li>
        <li>Must be standard stock items—no custom-made goods</li>
      </ul>
      <p className="text-gray-700">Change of mind returns may be limited to exchanges or store credit to prevent abuse.</p>
      <p className="text-gray-700">If your item has manufacturer&#39;s faults such as wrong item, incorrect description, or major defects, you are entitled to a refund or exchange.</p>
      <p className="text-gray-700">For warranty guidelines, refer to our <a href="#" className="text-blue-600 underline">Limited Warranty</a>.</p>

      <h3 className="text-xl font-semibold text-gray-700 mt-4">Refund Policy</h3>
      <p className="text-gray-700">Refunds are processed after the returned item is inspected. Please allow 3–5 business days for your refund to appear in your payment method once approved.</p>
      <p className="text-gray-700">You must return the item and provide related images/info to qualify. Failure to comply may result in a partial or no refund.</p>

      <h3 className="text-xl font-semibold text-gray-700 mt-4">Exclusions</h3>
      <p className="text-gray-700">Refunds, repairs, or replacements may not be issued if:</p>
      <ul className="list-disc list-inside text-gray-700">
        <li>You modify the product</li>
        <li>You misuse the item against provided instructions</li>
        <li>You return the product after the 30-day return window</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">4. Further Questions?</h2>
      <p className="text-gray-700">Contact our Customer Care Team at <strong>1300 696 488</strong>. Our advisors are here to help.</p>

      <p className="text-center text-gray-800 font-bold text-lg mt-6">Thank you for choosing Kayhan Audio! 🚗🔊</p>
    </div>
  );
};

export default ShippingPolicy;
