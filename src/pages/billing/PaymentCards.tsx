import React, { useState } from 'react';
import Button from '../../components/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignCircleIcon, InformationSquareIcon} from '@hugeicons/core-free-icons';
import visaLogo from '../../assets/visa-logo.svg';
import mastercardLogo from '../../assets/mastercard-logo.svg';
import amexLogo from '../../assets/amex-logo.svg';

interface PaymentCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  cardholderName: string;
}

const PaymentCards: React.FC = () => {
  // Temporary card data (in real case, this would be fetched from database)
  const [paymentCards] = useState<PaymentCard[]>([
    {
      id: 'card_1',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
      cardholderName: 'John Doe'
    },
    {
      id: 'card_2',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false,
      cardholderName: 'John Doe'
    },
    {
      id: 'card_3',
      last4: '1234',
      brand: 'American Express',
      expiryMonth: '03',
      expiryYear: '2024',
      isDefault: false,
      cardholderName: 'John Doe'
    }
  ]);

  const handleAddCard = () => {
    // This would open a modal to add a new payment card
    console.log('Add payment card clicked');
  };

  const getCardBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return <img src={visaLogo} alt="Visa" className="w-10 h-6 object-contain" />;
      case 'mastercard':
        return <img src={mastercardLogo} alt="Mastercard" className="w-10 h-6 object-contain" />;
      case 'american express':
        return <img src={amexLogo} alt="American Express" className="w-10 h- object-contain" />;
      default:
        return <div className="w-10 h-6 bg-gray-300 rounded flex items-center justify-center text-xs">💳</div>;
    }
  };

  const formatExpiryDate = (month: string, year: string) => {
    return `${month}/${year.slice(-2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">Payment Cards</h2>
      </div>

      {paymentCards.length > 0 ? (
        <>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {paymentCards.map((card) => (
              <div
                key={card.id}
                className={`border rounded-lg p-4 ${
                  card.isDefault 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCardBrandIcon(card.brand)}</span>
                  </div>
                  <div className="">
                    <p>Card ending **** {card.last4}</p>
                    <p className="text-sm text-gray-600">Expirery date: {formatExpiryDate(card.expiryMonth, card.expiryYear)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Card Button */}
          <div className='flex items-center gap-3'>
          <Button
            onClick={handleAddCard}
            variant="outline"
            className=""
          >
            <div className="flex items-center justify-center gap-2">
              <HugeiconsIcon icon={PlusSignCircleIcon} className="w-6 h-6" />
            </div>
          </Button>
          <p>Add a Payment Card</p>
          </div>
        </>
      ) : (
        /* No Cards Message */
        <div className="py-4 flex flex-col gap-8">
          <div className="flex items-center gap-2 bg-background rounded-md p-4">
            <HugeiconsIcon icon={InformationSquareIcon} className="w-8 h-8 text-primary" />
            <p className="">
              <b>You do not have a pre-authorised card</b>
            </p>
          </div>
          <div className='flex items-center gap-3'>
          <Button
            onClick={handleAddCard}
            variant="outline"
            className=""
          >
            <div className="flex items-center justify-center gap-2">
              <HugeiconsIcon icon={PlusSignCircleIcon} className="w-6 h-6" />
            </div>
          </Button>
          <p>Add a Payment Card</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCards;
