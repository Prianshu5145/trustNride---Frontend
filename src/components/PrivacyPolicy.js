// src/pages/PrivacyPolicy.jsx

import React from 'react';

import Navbar from '../components/Navbar'; // Update the path as needed

const PrivacyPolicy = () => {
  return (
    <div>
      

      <Navbar />

      <div className="max-w-4xl mx-auto p-6 text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>

        <p className="mb-4">
          Effective Date: <strong>June 5, 2025</strong>
        </p>

        <p className="mb-4">
          TRUST N RIDE ("Company", "we", "our", or "us") values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Info:</strong> Name, email, phone, address, ID proof, vehicle details.</li>
          <li><strong>Financial Info:</strong> Card/bank/UPI details, credit history for loans.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, time spent, actions on platform.</li>
          <li><strong>Cookies:</strong> To enhance and personalize your experience.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To deliver and improve services.</li>
          <li>To verify identity and prevent fraud.</li>
          <li>To communicate updates and offers.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing of Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>With service providers like payment or logistics partners.</li>
          <li>With legal authorities when required.</li>
          <li>During mergers or acquisitions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p className="mb-4">
          We use SSL encryption, access controls, and regular audits. However, no system is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access or correct your data.</li>
          <li>Request deletion or object to marketing.</li>
          <li>Withdraw consent at any time.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Data Retention</h2>
        <p className="mb-4">
          We retain data as long as needed to serve you and comply with law.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Third-Party Links</h2>
        <p className="mb-4">
          We're not responsible for privacy practices of third-party websites linked from our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">8. Children’s Privacy</h2>
        <p className="mb-4">
          We do not knowingly collect data from individuals under 18.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">9. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this policy periodically. Continued use means acceptance of changes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">10. Contact Us</h2>
        <p className="mb-4">
          <strong>TRUST N RIDE</strong><br />
          TRUST N RIDE, Gata Num- 57, Near RING ROAD, Near NEW JAIHERO, Akbarpur, Ratanpur, Ambedkar Nagar, Uttar Pradesh, 224122<br />
          Email: contact@trustnride.in<br />
          Phone: +919792983625
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
