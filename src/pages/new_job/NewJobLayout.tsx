import React from 'react';
import JobDetails from './JobDetails';
import Booking from './Booking';
import { NewJobProvider } from './NewJobContext';

const NewJobLayout: React.FC = () => {
  return (
    <NewJobProvider>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[7fr_3fr]">
            {/* JobDetails Section */}
            <div className="order-1 md:order-1">
              <JobDetails />
            </div>
            {/* Booking Section */}
            <div className="order-2 md:order-2">
              <Booking />
            </div>
          </div>
        </div>
      </div>
    </NewJobProvider>
  );
};

export default NewJobLayout;
