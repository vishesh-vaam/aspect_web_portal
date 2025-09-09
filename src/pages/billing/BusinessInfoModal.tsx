import React, { useState, useEffect } from 'react';
import Select from '../../components/Select';
import Radio from '../../components/Radio';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

interface BusinessInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BusinessInfoData) => void;
  initialData: BusinessInfoData;
}

export interface BusinessInfoData {
  companyType: string;
  poRequirement: string;
  vatRegistrationNumber: string;
  drcApplies: string;
  cisNumber: string;
}

const BusinessInfoModal: React.FC<BusinessInfoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [formData, setFormData] = useState<BusinessInfoData>(initialData);

  // Reset form data when modal opens with new initial data
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-[800px] mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Business Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Company Type */}
          <Select
            label="Company Type"
            value={formData.companyType}
            onChange={(value) => setFormData({ ...formData, companyType: value })}
            options={[
              { value: "Limited Company", label: "Limited Company" },
              { value: "Partnership", label: "Partnership" },
              { value: "Sole Proprietor", label: "Sole Proprietor" },
              { value: "LLC", label: "LLC" }
            ]}
            required
          />

          {/* PO Requirement */}
          <Radio
            label="PO Requirement"
            value={formData.poRequirement}
            onChange={(value) => setFormData({ ...formData, poRequirement: value })}
            options={[
              { value: "Required", label: "Required" },
              { value: "Not Required", label: "Not Required" }
            ]}
            required
          />

          {/* VAT Registration Number */}
          <TextInput
            label="VAT Registration Number"
            value={formData.vatRegistrationNumber}
            onChange={(value) => setFormData({ ...formData, vatRegistrationNumber: value })}
            placeholder="Enter VAT registration number"
            required
          />

          {/* DRC Applies */}
          <Radio
            label="DRC Applies"
            value={formData.drcApplies}
            onChange={(value) => setFormData({ ...formData, drcApplies: value })}
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" }
            ]}
            required
          />

          {/* CIS Number */}
          <TextInput
            label="CIS Number"
            value={formData.cisNumber}
            onChange={(value) => setFormData({ ...formData, cisNumber: value })}
            placeholder="Enter CIS number"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start gap-3 mt-6 pt-4">
          <Button
            variant="primary"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoModal;
