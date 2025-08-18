import React, { useState } from "react";

import {
  ShieldCheck,
  Globe,
  FileText,
  MapPin,
  MessageCircle,
  ScrollText,
  Gavel,
  Phone,
  X,
} from "lucide-react";

// Feature Items
const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    title: "Secure Authentication",
    description: "Ensures only verified users can create or sign agreements.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-green-600" />,
    title: "Automatic Geo-tagging",
    description: "Links land location data with the agreement automatically.",
  },
  {
    icon: <FileText className="w-6 h-6 text-green-600" />,
    title: "Multilingual Legal Templates",
    description: "Ready-to-use contract templates in multiple local languages.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-green-600" />,
    title: "Grievance Redressal",
    description:
      "Dedicated system to handle and resolve land-related complaints.",
  },
  {
    icon: <Globe className="w-6 h-6 text-green-600" />,
    title: "Real-Time Tracking",
    description: "Follow the agreement process step-by-step in real-time.",
  },
];

// Agreement Templates
const agreements = [
  {
    title: "Land Lease Agreement",
    description: "For leasing agricultural land to farmers or tenants.",
    doc: "PDF/Doc template available",
    file: "/agreements/Lease Deed.pdf",
  },
  {
    title: "House Rental Contract",
    description: "Rental contracts for fixed time periods.",
    doc: "PDF/Doc template available",
file: "/agreements/house-rental.pdf",
  },
  {
    title: "Agreement for Sale of Agricultural Land",
    description: "Standard legal format for selling agricultural land.",
    doc: "PDF format available",
    file: "/agreements/agriculture-sale.pdf",
  },
];

// Legal Laws
const laws = [
  {
    title: "The Indian Contract Act, 1872",
    detail: "Governs all forms of legal agreements and land dealings.",
  },
  {
    title: "The Registration Act, 1908",
    detail: "Mandates registration of land agreements and deeds.",
  },
  {
    title: "Digital India Land Records Modernization Programme (DILRMP)",
    detail: "Supports digitization of land records and transactions.",
  },
];

const AgrowAgreementPage = () => {
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  const handleViewClick = (agreement) => {
    setSelectedAgreement(agreement);
  };

  const handleCloseModal = () => {
    setSelectedAgreement(null);
  };

  const handleDownload = () => {
    if (!selectedAgreement?.file) return;

    const a = document.createElement("a");
    a.href = selectedAgreement.file;
    a.download = selectedAgreement.title.replace(/\s+/g, "_") + ".pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* Title */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          AGROW Digital Agreements
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Ensure <strong>legal security</strong>, <strong>transparency</strong>{" "}
          and <strong>digital convenience</strong> in land transactions.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Agreement Templates */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <ScrollText /> Agreement Templates
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {agreements.map((item, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded shadow-md hover:shadow-lg"
            >
              <h4 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h4>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <p className="text-sm text-green-700 mt-2">{item.doc}</p>
              <button
                onClick={() => handleViewClick(item)}
                className="mt-3 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
              >
                View Sample
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Laws */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <Gavel /> Important Legal Provisions
        </h2>
        <ul className="space-y-4">
          {laws.map((law, i) => (
            <li
              key={i}
              className="bg-white rounded-md shadow p-4 border-l-4 border-green-600"
            >
              <h4 className="text-lg font-semibold">{law.title}</h4>
              <p className="text-gray-600">{law.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Sample Template */}
      {selectedAgreement && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg relative p-6">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              {selectedAgreement.title} - Sample
            </h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {selectedAgreement.sample}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgrowAgreementPage;
