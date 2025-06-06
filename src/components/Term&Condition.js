import React from 'react';

import Navbar from '../components/Navbar'; // Update this path as needed

const TermsAndConditions = () => {
  return (
    <div>
      
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-6">Terms and Conditions</h1>

        <p className="mb-4">
          These Terms and Conditions ("Agreement") are entered into by and between you ("User", "you", or "your") and <strong>TRUST N RIDE</strong> ("Company", "we", "us", or "our"). By using our website, services, or platform, you agree to be bound by these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Eligibility</h2>
        <p className="mb-4">
          You must be at least 18 years old and capable of entering into legally binding contracts under Indian law to use this platform.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Services Offered</h2>
        <p className="mb-4">
          TRUST N RIDE offers a platform to buy, sell, and evaluate new and used vehicles. We also provide tools such as vehicle history checks, inspection reports, and financing options.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Provide accurate and complete information.</li>
          <li>Do not post illegal, misleading, or harmful content.</li>
          <li>Comply with all applicable laws and regulations.</li>
          <li>Maintain confidentiality of your login credentials.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Vehicle Listings</h2>
        <p className="mb-4">
          If you are listing a vehicle for sale, you must be the lawful owner or authorized seller. The vehicle must be accurately described and available for inspection.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Payments and Fees</h2>
        <p className="mb-4">
          Payments made via our platform are processed through third-party gateways. TRUST N RIDE is not responsible for payment gateway errors or delays. Listing fees, if any, are non-refundable.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Cancellations and Refunds</h2>
        <p className="mb-4">
          Any cancellation or refund policies will be governed by specific service terms. Please review those at the time of booking or payment.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Limitation of Liability</h2>
        <p className="mb-4">
          TRUST N RIDE is not liable for direct or indirect damages arising from transactions between users or issues related to vehicles listed or sold. We do not guarantee the quality, condition, or legality of listed vehicles.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">8. Intellectual Property</h2>
        <p className="mb-4">
          All content on the platform, including logos, trademarks, and data, is owned or licensed by TRUST N RIDE and protected by applicable IP laws. Unauthorized use is prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">9. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your access to the platform at our sole discretion for violations of these terms or applicable law.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">10. Governing Law and Jurisdiction</h2>
        <p className="mb-4">
          These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in [Insert Your City], India.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">11. Changes to These Terms</h2>
        <p className="mb-4">
          We may update these Terms and Conditions at any time. Continued use of our services constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">12. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding these terms, please contact:
        </p>
        <p>
          <strong>TRUST N RIDE</strong><br />
          GST No: 09AAVFT6318H1ZJ<br />
          TRUST N RIDE, Gata Num- 57, Near RING ROAD, Near NEW JAIHERO, Akbarpur, Ratanpur, Ambedkar Nagar, Uttar Pradesh, 224122<br />
          Email: contact@trustnride.in<br />
          Phone: +919792983625
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
