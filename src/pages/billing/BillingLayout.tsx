import React from 'react';
import BusinessInfo from './BusinessInfo';
import PaymentCards from './PaymentCards';
import UserAccount from './UserAccount';

const BillingLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-2">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BusinessInfo />
              <UserAccount />
          </div>
          <div>
            <PaymentCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingLayout;
