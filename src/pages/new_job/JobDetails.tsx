import React from 'react';
import Property from './Property';
import JobType from './JobType';
import JobDateTime from './JobDateTime';
import JobOwnerPresence from './JobOwnerPresence';
import JobPoNumber from './JobPoNumber';
import JobAdditionalDetails from './JobAdditionalDetails';

const JobDetails: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <Property />
        <JobType />
        <JobDateTime />
        <JobOwnerPresence />
        <JobPoNumber />
        <JobAdditionalDetails />
      </div>
    </div>
  );
};

export default JobDetails;
