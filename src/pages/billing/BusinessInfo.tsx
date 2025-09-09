import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PencilEdit02Icon } from '@hugeicons/core-free-icons';
import BusinessInfoModal, { type BusinessInfoData } from './BusinessInfoModal';

const BusinessInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessInfoData>({
    companyType: "Limited Company",
    poRequirement: "Required",
    vatRegistrationNumber: "GB123456789",
    drcApplies: "Yes",
    cisNumber: "CIS123456"
  });

  // Business information data structure, Ideally this is coming from Context file
  const businessInfo = [
    {
      label: "Company Type",
      value: businessData.companyType
    },
    {
      label: "PO Requirement",
      value: businessData.poRequirement
    },
    {
      label: "VAT Registration Number",
      value: businessData.vatRegistrationNumber
    },
    {
      label: "DRC Applies",
      value: businessData.drcApplies
    },
    {
      label: "CIS Number",
      value: businessData.cisNumber
    }
  ];

  const handleSave = (data: BusinessInfoData) => {
    setBusinessData(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <h2 className="text-xl font-semibold mb-4">Business Information</h2>
      <div className="grid grid-cols-2 gap-4">
        {businessInfo.map((info, index) => (
          <div key={index} className="pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <b>{info.label}</b>
            </label>
            <div className="text-gray-900">
              {info.value}
            </div>
          </div>
        ))}
      </div>
      
      {/* Edit Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-4 right-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        title="Edit Business Information"
      >
        <HugeiconsIcon icon={PencilEdit02Icon} className="w-7 h-7" />
      </button>

      {/* Modal */}
      <BusinessInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={businessData}
      />
    </div>
  );
};

export default BusinessInfo;
