import React from 'react';
import BookingPrice from './BookingPrice';
import BookingDiscount from './BookingDiscount';
import BookingCautions from './BookingCautions';
import BookingPartsMaterialsInfo from './BookingPartsMaterialsInfo';
import BookingButton from './BookingButton';

const Booking: React.FC = () => {
  return (
    <div className="p-6 flex flex-col gap-4">
      <BookingPrice />
      <BookingDiscount />
      <BookingCautions />
      <BookingPartsMaterialsInfo />
      <BookingButton />
    </div>
  );
};

export default Booking;
