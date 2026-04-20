import React from "react";
import Image from "next/image";

const CustSev = () => {
  return (
    <section className="w-[90%] xl:w-[80%] mx-auto p-4 text-black">
      <h1 className="text-3xl text-center font-serif">Privacy Policy</h1>

      <div className="flex flex-col xl:flex-row mt-8 gap-6">
        <div className="xl:w-1/2">
          <h3 className="font-bold mt-4">1. Information we collect</h3>
          <ul className="text-xs space-y-1 list-disc ml-4 mt-1">
            <li>Name</li>
            <li>Mailing or street address</li>
            <li>Email address</li>
            <li>Social media information</li>
            <li>Telephone number and other contact details</li>
            <li>Date of birth</li>
            <li>Credit card or other payment information</li>
            <li>Information about your business or personal circumstances</li>
            <li>Information from surveys, questionnaires, or promotions</li>
            <li>Device identity, page view stats, IP address, ads data, geolocation</li>
            <li>Information about third parties</li>
            <li>Other information provided by you or required by us</li>
          </ul>

          <h3 className="font-bold mt-4">2. How we collect personal information</h3>
          <p className="text-xs mt-1">
            We collect your information directly or from third parties when you:
          </p>
          <ul className="text-xs list-disc ml-4 mt-1 space-y-1">
            <li>Contact us through our website</li>
            <li>Receive goods or services from us</li>
            <li>Submit online sign-up forms</li>
            <li>Communicate via email, phone, SMS, or social media</li>
            <li>Interact with our website, services, or ads</li>
            <li>Show interest in purchasing or investing in our business</li>
          </ul>
          <p className="text-xs mt-2">
            We also use analytics tools, cookies, and similar technologies to
            collect data. You may disable cookies via your browser settings. We
            use Google Analytics in accordance with their data use policy.
          </p>

          <h3 className="font-bold mt-4">3. Use of your personal information</h3>
          <p className="text-xs mt-1">We use your personal information to:</p>
          <ul className="text-xs list-disc ml-4 mt-1 space-y-1">
            <li>Provide goods, services, or information</li>
            <li>Maintain records and manage admin tasks</li>
            <li>Allow contractors or third parties to provide services</li>
            <li>Improve service and customer experience</li>
            <li>Enforce legal agreements and obligations</li>
            <li>Send marketing/promotional communications (opt-out available)</li>
            <li>Send notices, updates, or alerts</li>
            <li>Process job applications</li>
          </ul>

          <h3 className="font-bold mt-4">4. Personal information sharing</h3>
          <p className="text-xs mt-1">
            We may share your information with contractors or cloud providers
            in Australia or overseas. We take reasonable steps to ensure they
            handle it in accordance with our standards.
          </p>

          <h3 className="font-bold mt-4">5. Protection of personal information</h3>
          <p className="text-xs mt-1">
            Our cybersecurity team protects your data from misuse and
            unauthorized access. Our systems use passwords and administrative
            and technical safeguards.
          </p>

          <h3 className="font-bold mt-4">6. Links</h3>
          <p className="text-xs mt-1">
            Our website may contain links to other websites. We are not
            responsible for their privacy policies. Please read them before use.
          </p>

          <h3 className="font-bold mt-4">7. Personal information access and correction</h3>
          <p className="text-xs mt-1">
            You may contact us to access or correct your personal data. We may
            request proof of identity and will respond in a reasonable time. In
            some cases, we may deny access with a detailed explanation.
          </p>

          <h3 className="font-bold mt-4">8. Complaints or questions</h3>
          <p className="text-xs mt-1">
            For questions or complaints, contact our Privacy Officer via:
          </p>
          <p className="text-xs ml-4">
            <strong>Email:</strong> info@caraudioexpert.com.au
          </p>

          <h3 className="font-bold mt-4">9. Privacy policy update</h3>
          <p className="text-xs mt-1">
            This policy is updated from time to time. We recommend reviewing it
            regularly to stay informed of how we manage your data.
          </p>
          <p className="text-xs mt-1">Last updated: 10 May 2024</p>
        </div>

        <Image
          className="hidden xl:block xl:w-1/2 h-[30rem] shadow-md rounded-md"
          src="/images/960x0.webp"
          alt="Kayhan Audio introduction"
          width={800}
          height={350}
        />
      </div>
    </section>
  );
};

export default CustSev;