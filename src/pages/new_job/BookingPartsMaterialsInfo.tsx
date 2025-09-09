import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AlertSquareIcon } from '@hugeicons/core-free-icons';

interface PartsMaterialsItem {
  message: string;
}

const BookingPartsMaterialsInfo: React.FC = () => {
  const partsMaterialsContent: PartsMaterialsItem[] = [
    {
      message: "Parts and materials will be charged as required."
    }
  ];

  return (
    <div className="w-full bg-primary rounded-md shadow-sm">
      <div className='w-full bg-white rounded-md'>
        {/* Section 1: Title */}
        <div className='w-full bg-background rounded-md flex items-center gap-2 px-4 py-2'>
          <HugeiconsIcon icon={AlertSquareIcon} />
          <p className="text-lg font-semibold text-gray-900">
            Parts & Materials
          </p>
        </div>

        {/* Section 2: Content */}
        <div className="p-4 flex flex-col gap-3">
          {partsMaterialsContent.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col gap-1">
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

export default BookingPartsMaterialsInfo;
