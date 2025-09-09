import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, CancelCircleIcon } from '@hugeicons/core-free-icons';

const UserAccount: React.FC = () => {
  // User account information data structure, Ideally this is coming from Context file
  const userAccountInfo = [
    {
      label: "Account Type",
      value: "Corporate"
    },
    {
      label: "Credit Limit",
      value: "£ 12500"
    },
    {
      label: "Payment Method",
      value: "Credit account"
    },
    {
      label: "Payment Terms",
      value: "30 days"
    },
    {
      label: "Status",
      value: "Active"
    }
  ];

  const renderValue = (label: string, value: string) => {
    if (label === "Status") {
      const isActive = value.toLowerCase() === "active";
      return (
        <div className={`flex items-center gap-2 rounded`}>
          <div className={`flex items-center gap-2 px-2 py-1 rounded ${isActive ? 'bg-green-50 text-green-700 border border-green-500' : 'bg-red-50 text-red-700'}`}>
            <HugeiconsIcon 
              icon={isActive ? CheckmarkCircle02Icon : CancelCircleIcon} 
              className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-red-600'}`}
            />
            <span className={isActive ? "text-green-700" : "text-gray-900"}>{value}</span>
          </div>
        </div>
      );
    }
    return <div className="text-gray-900">{value}</div>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">User Account</h2>
      <div className="grid grid-cols-2 gap-4">
        {userAccountInfo.map((info, index) => (
          <div key={index} className="pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <b>{info.label}</b>
            </label>
            {renderValue(info.label, info.value)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAccount;
