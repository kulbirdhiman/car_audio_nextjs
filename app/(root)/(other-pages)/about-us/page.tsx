import React from "react";
import InfoCard from "@/components/footer/infoCard";

const About = () => {
  return (
    <section className="w-[90%] mx-auto py-16 text-black space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">About Us</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Car Audio Expert is one of the best automobile device suppliers in Australia. Our professional staff take pride in delivering top-quality products that enhance your driving experience. With over 20 years in the business, we bring both innovation and reliability to every ride.
        </p>
      </div>

      {/* Core Sections - Our Journey, Mission, Why Choose Us */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InfoCard
          title="Our Journey"
          content="Founded in 1997 in Germany, Car Audio Expert later moved its headquarters and production to Australia to better serve the growing local market. We’ve since earned the trust of hundreds of thousands of customers nationwide."
        />
        <InfoCard
          title="Our Goal"
          content="We aim to deliver innovative and reliable car entertainment and accessory solutions. Our expanding product range and focus on R&D help us stay ahead of automotive trends and continue serving enthusiasts across Australia."
        />
        <InfoCard
          title="Why Choose Us"
          content="We offer premium quality products made in-house, great customer service, wide compatibility with car models, and competitive pricing to give you the best value possible."
        />
      </div>

      {/* What We Offer Section */}
      <div className="space-y-8">
        <h3 className="text-3xl font-semibold text-center text-gray-900">What We Offer</h3>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          From head units to harnesses, our wide selection of products is built using premium materials and cutting-edge technology to guarantee performance, durability, and ease of installation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <InfoCard title="Head Units" content="Advanced infotainment systems tailored for various vehicles." />
          <InfoCard title="Steering Wheels" content="Modern, ergonomic designs to elevate your control and comfort." />
          <InfoCard title="Car Batteries" content="Efficient and long-lasting power solutions for any drive." />
          <InfoCard title="CarPlay Interfaces" content="Seamless smartphone integration for smarter driving." />
          <InfoCard title="Audio Equipment" content="High-quality sound systems that deliver powerful clarity." />
          <InfoCard title="Frames & Fascias" content="Custom-fit parts for a sleek, OEM-like dashboard look." />
          <InfoCard title="Wiring Harnesses" content="Durable connectors and harnesses for easy installation." />
          <InfoCard title="Accessories" content="All the extras to personalize and upgrade your car’s interior." />
        </div>
      </div>

      {/* Visit Us Section */}
      <div className="text-center space-y-6">
        <h3 className="text-3xl font-semibold text-gray-900">Visit Us</h3>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Visit our workshop at <strong>Unit 3, 151 Dohertys Rd, Laverton North, VIC 3026, Australia</strong>, open <strong>Monday to Saturday, 9:00 AM - 6:00 PM</strong>.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Prefer online shopping? Browse our full product catalog at{" "}
          <a
            href="https://caraudioexpert.com.au"
            className="text-blue-600 underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.caraudioexpert.com.au
          </a>
          , available 24/7. Our online support team is here to assist daily from <strong>9:00 AM to 6:00 PM</strong>.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Car Audio Expert is your one-stop destination for all things car audio and accessories. Experience quality, innovation, and trusted service all in one place.
        </p>
      </div>
    </section>
  );
};

export default About;