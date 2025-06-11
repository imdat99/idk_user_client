import {
  BugOff,
  ChartNetwork,
  Headset,
  Lock,
  Mail,
  Shield,
} from 'lucide-react';
import React from 'react';

const Privacy = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex flex-1">
          {/* Sidebar Navigation */}

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl p-8">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-gray-500">Last updated: June 15, 2023</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    GDPR Compliant
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    CCPA Ready
                  </span>
                </div>
              </div>
              <div className="prose max-w-none">
                <section id="overview" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="mb-4">
                    At Xemdi, we are committed to protecting your privacy and
                    ensuring the security of your personal information. This
                    Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you use our services.
                  </p>
                  <p className="mb-4">
                    This policy applies to all Xemdi products, services, and
                    websites (collectively, "Services"). By using our Services,
                    you consent to the data practices described in this policy.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-info-circle text-blue-500 mt-1" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          We never sell your personal data to third parties.
                          Your trust is our top priority.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <section id="data-collection" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
                  <p className="mb-4">
                    We collect several types of information from and about users
                    of our Services, including:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-2">
                      Information You Provide Directly
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Account registration details (name, email, password)
                      </li>
                      <li>
                        Profile information (photo, job title, organization)
                      </li>
                      <li>Payment and billing information</li>
                      <li>Communications with our support team</li>
                      <li>Survey responses and feedback</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-2">
                      Information Collected Automatically
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Device information (IP address, browser type, operating
                        system)
                      </li>
                      <li>
                        Usage data (pages visited, features used, time spent)
                      </li>
                      <li>Cookies and similar tracking technologies</li>
                      <li>Location data (if enabled by user)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">
                      Information From Third Parties
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Social media platforms (when you connect your accounts)
                      </li>
                      <li>Business partners and service providers</li>
                      <li>Publicly available sources</li>
                    </ul>
                  </div>
                </section>
                <section id="data-use" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">
                    How We Use Your Data
                  </h2>
                  <p className="mb-4">
                    We use the information we collect for various purposes,
                    including:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <i className="fas fa-check-circle text-green-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-green-800">
                            Service Delivery
                          </h3>
                          <p className="text-sm text-green-700 mt-1">
                            To provide and maintain our Services, authenticate
                            users, and process transactions.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <i className="fas fa-user-cog text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-blue-800">
                            Personalization
                          </h3>
                          <p className="text-sm text-blue-700 mt-1">
                            To customize your experience and provide tailored
                            content and recommendations.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <i className="fas fa-chart-line text-purple-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-purple-800">
                            Analytics
                          </h3>
                          <p className="text-sm text-purple-700 mt-1">
                            To understand how our Services are used and improve
                            them.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <i className="fas fa-shield-alt text-yellow-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-yellow-800">
                            Security
                          </h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            To detect, prevent, and address technical issues and
                            security risks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    We only process personal data when we have a lawful basis to
                    do so, including consent, contract fulfillment, legal
                    compliance, and legitimate interests.
                  </p>
                </section>
                <section id="data-sharing" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">
                    Data Sharing and Disclosure
                  </h2>
                  <p className="mb-4">
                    We may share your information in the following
                    circumstances:
                  </p>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            With Whom
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Purpose
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Data Shared
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Service Providers
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Hosting, analytics, payment processing
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Necessary operational data
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Business Partners
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Integrated services you choose
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Data needed for integration
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Legal Authorities
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Compliance with laws and regulations
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            As required by law
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Corporate Transactions
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Mergers, acquisitions, or asset sales
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Business-related data
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-exclamation-triangle text-red-500 mt-1" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          We never sell your personal data to third-party
                          advertisers or data brokers.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <section id="security" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                  <p className="mb-4">
                    We implement appropriate technical and organizational
                    measures to protect your personal data:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                          <Lock />
                        </div>
                        <h3 className="font-medium">Encryption</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        All data in transit is encrypted using TLS 1.2+
                        protocols
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                          <Shield />
                        </div>
                        <h3 className="font-medium">Access Control</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Strict role-based access to sensitive data
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                          <ChartNetwork />
                        </div>
                        <h3 className="font-medium">Monitoring</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        24/7 security monitoring and anomaly detection
                      </p>
                    </div>
                  </div>
                  <p className="mb-4">
                    While we strive to protect your personal data, no method of
                    transmission over the Internet or method of electronic
                    storage is 100% secure. We cannot guarantee absolute
                    security.
                  </p>
                </section>
                <section id="your-rights" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">
                    Your Privacy Rights
                  </h2>
                  <p className="mb-4">
                    Depending on your location, you may have certain rights
                    regarding your personal data:
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">
                          Access &amp; Portability
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Request access to your personal data</li>
                          <li>
                            Receive a copy of your data in a portable format
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">
                          Correction &amp; Deletion
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Request correction of inaccurate data</li>
                          <li>Request deletion of your personal data</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">
                          Restriction &amp; Objection
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Restrict processing of your data</li>
                          <li>Object to certain processing activities</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Withdraw Consent</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Withdraw previously given consent</li>
                          <li>Opt-out of marketing communications</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4">
                    To exercise these rights, please contact us using the
                    information in the "Contact Us" section below. We may need
                    to verify your identity before processing your request.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-exclamation-circle text-yellow-500 mt-1" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Some rights may be limited where we have an overriding
                          legitimate interest or legal obligation.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <section id="changes" className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="mb-4">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date at the
                    top.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Change History</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">June 15, 2023</p>
                          <p className="text-xs text-gray-500">
                            Added CCPA compliance details and expanded data
                            subject rights section
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-2 w-2 rounded-full bg-gray-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">January 5, 2023</p>
                          <p className="text-xs text-gray-500">
                            Clarified data retention policies and international
                            transfer mechanisms
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-2 w-2 rounded-full bg-gray-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">August 20, 2022</p>
                          <p className="text-xs text-gray-500">
                            Initial version published
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section id="contact" className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy or our
                    privacy practices, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                          <Mail className="text-lg" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-sm text-gray-600">
                            privacy@Xemdi.example
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        For general privacy inquiries and data subject requests
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                          <Headset className="text-lg" />
                        </div>
                        <div>
                          <h3 className="font-medium">Support</h3>
                          <p className="text-sm text-gray-600">
                            +1 (555) 123-4567
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        For urgent matters regarding your account security
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="mt-8 mb-2 text-center text-xs text-gray-500">
              <p>© 2025 Xemdi. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <a href="#" className="hover:text-gray-700">
                  Điều khoản
                </a>
                <a href="#" className="hover:text-gray-700">
                  Bảo mật
                </a>
                <a href="#" className="hover:text-gray-700">
                  Trợ giúp
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Privacy;
