import React from 'react';
import TextInput from '../../components/TextInput';
import { useNewJob } from './NewJobContext';

const JobPoNumber: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();

  const handlePoNumberChange = (value: string) => {
    updateJobState({ poNumber: value });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        PO number
      </h2>
      <div className="bg-background px-3 py-4 rounded-md">
        <TextInput
            value={jobState.poNumber}
            onChange={handlePoNumberChange}
            placeholder="Please Insert your PO number here"
            name="poNumber"
        />
      </div>
    </div>
  );
};

export default JobPoNumber;
