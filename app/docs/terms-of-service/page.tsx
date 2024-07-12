import { Footer } from "@/components/footer";
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

const TermsOfService = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6">
          Terms of Service for Headless Friend Finder
        </h1>
        <p className="mb-4">Effective Date: 06/07/2024</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to Headless Friend Finder
          </h2>
          <p className="mb-2">
            Welcome to Headless Friend Finder ("we," "our," "us"). By accessing
            or using our web application, cl.headless.org (the "Service"), you
            agree to comply with and be bound by these Terms of Service
            ("Terms"). These Terms govern your use of the Service, so please
            read them carefully. If you do not agree to these Terms, you should
            not use the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            1. Description of Service
          </h2>
          <p className="mb-2">
            Headless Friend Finder is a web application designed to facilitate
            connections among members of the Headless community. The Service
            allows users to:
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              Enter their personal information to find other community members
              in their vicinity.
            </li>
            <li>
              Display nearby users on a map and table view within a selected
              radius.
            </li>
            <li>Receive alerts when new users join the community.</li>
            <li>Join location-based Discord channels.</li>
            <li>Export lists of nearby users via email or other methods.</li>
          </ul>
          <p className="mb-2">
            Our goal is to enhance community engagement by helping members
            locate and connect with one another easily.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            2. Company Information
          </h2>
          <p className="mb-2">
            <strong>Website:</strong> headless.org
          </p>
          <p className="mb-2">
            <strong>Contact Email:</strong> headless.developer@outlook.com
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. User Requirements</h2>
          <p className="mb-2">
            To use the Service, you must meet the following requirements:
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              <strong>Age Restriction:</strong> You must be at least 18 years
              old to register for and use the Service.
            </li>
            <li>
              <strong>Geographic Limitation:</strong> There are no specific
              geographic limitations for using the Service; it is available to
              users worldwide.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            4. Account Information
          </h2>
          <p className="mb-2">
            When creating an account with Headless Friend Finder, you agree to:
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              Provide accurate, current, and complete information, including
              your email address, name, address, Discord ID, Telegram username,
              and interests.
            </li>
            <li>Keep your account information up-to-date.</li>
            <li>
              Maintain the confidentiality of your account login information.
            </li>
            <li>
              Accept responsibility for all activities that occur under your
              account.
            </li>
          </ul>
          <p className="mb-2">
            You may edit, update, or delete your information or account at any
            time through the Service’s account settings. Deleting your account
            will result in the permanent removal of your data from our systems.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
          <p className="mb-2">
            To maintain a respectful and safe environment within the Headless
            Friend Finder, you agree to the following conduct guidelines:
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              <strong>Respect:</strong> Treat all users with respect and
              courtesy.
            </li>
            <li>
              <strong>No Spam:</strong> Refrain from sending unsolicited
              messages or advertisements.
            </li>
            <li>
              <strong>No Harassment:</strong> Do not engage in any form of
              harassment, abuse, or offensive behavior.
            </li>
            <li>
              <strong>Legality:</strong> Comply with all applicable laws and
              regulations while using the Service.
            </li>
            <li>
              <strong>Purpose:</strong> Use the Service solely for the purpose
              of connecting with other Headless community members through group
              calls and meetings.
            </li>
            <li>
              <strong>Content:</strong> Do not post or transmit any content that
              is harmful, offensive, or inappropriate.
            </li>
          </ul>
          <p className="mb-2">
            We reserve the right to suspend or terminate your account if you
            violate these guidelines or engage in any behavior that we deem
            harmful to the community.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Content and Intellectual Property
          </h2>
          <p className="mb-2">
            <strong>User Content:</strong> Users retain ownership of the content
            they provide. By submitting content, you grant us a non-exclusive,
            worldwide, royalty-free license to use, display, and distribute your
            content within the scope of the Service.
          </p>
          <p className="mb-2">
            <strong>Service Content:</strong> The Service and its original
            content, features, and functionality are and will remain the
            exclusive property of Headless Friend Finder and its licensors. This
            includes but is not limited to software, text, graphics, logos, and
            trademarks.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            7. Payment and Subscription Details
          </h2>
          <p className="mb-2">
            The Service is provided free of charge. There are no fees, payments,
            or subscriptions required to use the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">8. Privacy Policy</h2>
          <p className="mb-2">
            Your use of the Service is also governed by our Privacy Policy,
            which details how we collect, use, and protect your information. By
            using the Service, you consent to the practices described in our
            Privacy Policy.{" "}
            <Link href="/docs/privacy-policy" className="text-blue-500">
              Read our full Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            9. Third-Party Services
          </h2>
          <p className="mb-2">
            The Service integrates with third-party services to enhance
            functionality:
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              <strong>Clerk:</strong> Used for user management and
              authentication.
            </li>
            <li>
              <strong>Discord:</strong> Facilitates communication among
              community members.
            </li>
            <li>
              <strong>Vercel:</strong> Handles deployment of the Service.
            </li>
            <li>
              <strong>PostHog:</strong> Analyzes user behavior to improve the
              Service.
            </li>
          </ul>
          <p className="mb-2">
            Your interaction with these third-party services is subject to their
            respective terms and policies. We do not control and are not
            responsible for the content or practices of any third-party
            services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            10. Disclaimers and Limitation of Liability
          </h2>
          <p className="mb-2">
            <strong>Disclaimer of Warranties:</strong> The Service is provided
            on an "as-is" and "as-available" basis. We make no warranties,
            express or implied, regarding the operation of the Service or the
            information, content, or materials included. To the fullest extent
            permissible under applicable law, we disclaim all warranties,
            express or implied, including but not limited to implied warranties
            of merchantability and fitness for a particular purpose.
          </p>
          <p className="mb-2">
            <strong>Limitation of Liability:</strong> In no event shall Headless
            Friend Finder, its affiliates, or its licensors be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from:
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>Your use or inability to use the Service.</li>
            <li>
              Any unauthorized access to or use of our servers and/or any
              personal information stored therein.
            </li>
            <li>
              Any interruption or cessation of transmission to or from the
              Service.
            </li>
            <li>
              Any bugs, viruses, or other harmful components transmitted to or
              through the Service by any third party.
            </li>
            <li>
              Any errors or omissions in any content or for any loss or damage
              incurred as a result of your use of any content posted, emailed,
              transmitted, or otherwise made available through the Service.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            11. Modification of Terms
          </h2>
          <p className="mb-2">
            We reserve the right to modify these Terms at any time. If we make
            changes, we will provide notice by posting the updated Terms on the
            Service and updating the "Effective Date" at the top of this
            document. You are responsible for reviewing the updated Terms. Your
            continued use of the Service after any changes to the Terms
            constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
          <p className="mb-2">
            These Terms shall be governed and construed in accordance with the
            laws of the jurisdiction in which Headless Friend Finder operates,
            without regard to its conflict of law principles. Any legal action
            or proceeding arising under these Terms will be brought exclusively
            in the courts of that jurisdiction.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
          <p className="mb-2">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-2">
            <strong>Email:</strong> headless.developer@outlook.com
          </p>
          <p className="mb-2">
            By using the Service, you acknowledge that you have read,
            understood, and agree to be bound by these Terms.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
