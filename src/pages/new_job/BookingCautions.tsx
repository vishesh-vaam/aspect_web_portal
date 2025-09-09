import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AlertSquareIcon } from '@hugeicons/core-free-icons';

interface CautionItem {
  title: string;
  message: string;
}

const BookingCautions: React.FC = () => {
  const cautionContent: CautionItem[] = [
    {
      title: "You stay in control",
      message: "After two hours, we will pause for a review to assess the scope and agree on any extra charges before proceeding."
    },
    {
      title: "We don't charge for:",
      message: "Parking, fuel, congestion charge, or ULEZ."
    }
  ];

  return (
    <div className="w-full bg-primary rounded-md shadow-sm">
      <div className='w-full bg-white rounded-md'>
        {/* Section 1: Title */}
        <div className='w-full bg-background rounded-md flex items-center gap-2 px-4 py-2'>
          <HugeiconsIcon icon={AlertSquareIcon} />
          <p className="text-lg font-semibold text-gray-900">
            No Surprises
          </p>
        </div>

        {/* Section 2: Content */}
        <div className="p-4 flex flex-col gap-3">
          {cautionContent.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col gap-1">
                <h3 className="text-md font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCautions;
