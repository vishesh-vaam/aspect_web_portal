import React, { useState } from "react";
import Button from "../../components/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignCircleIcon } from "@hugeicons/core-free-icons";
import visaLogo from "../../assets/visa-logo.svg";
import mastercardLogo from "../../assets/mastercard-logo.svg";
import amexLogo from "../../assets/amex-logo.svg";

interface PaymentCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  cardholderName: string;
}

interface CreditCardChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceNumber: string;
  amount: number;
}

const CreditCardChoiceModal: React.FC<CreditCardChoiceModalProps> = ({
  isOpen,
  onClose,
  invoiceNumber,
  amount,
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Sample payment cards data (in a real app, this would be fetched from an API)
  const paymentCards: PaymentCard[] = [
    {
      id: "card_1",
      last4: "4242",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
      cardholderName: "John Doe",
    },
    {
      id: "card_2",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false,
      cardholderName: "John Doe",
    },
    {
      id: "card_3",
      last4: "1234",
      brand: "American Express",
      expiryMonth: "03",
      expiryYear: "2024",
      isDefault: false,
      cardholderName: "John Doe",
    },
  ];

  const getCardBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return (
          <img src={visaLogo} alt="Visa" className="w-10 h-6 object-contain" />
        );
      case "mastercard":
        return (
          <img
            src={mastercardLogo}
            alt="Mastercard"
            className="w-10 h-6 object-contain"
          />
        );
      case "american express":
        return (
          <img
            src={amexLogo}
            alt="American Express"
            className="w-10 h-6 object-contain"
          />
        );
      default:
        return (
          <div className="w-10 h-6 bg-gray-300 rounded flex items-center justify-center text-xs">
            💳
          </div>
        );
    }
  };

  const formatExpiryDate = (month: string, year: string) => {
    return `${month}/${year.slice(-2)}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handlePayWithNewCard = () => {
    console.log("Pay with new card clicked");
    // This would open a form to add a new card and then process payment
  };

  const handlePayNow = () => {
    if (selectedCard) {
      console.log("Processing payment with card:", selectedCard);
      // Process payment logic here
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedCard(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleCancel}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="text-xl font-semibold">Make a Payment</h2>
          </div>

          {/* Content */}
          <div className="p-6 pt-2">
            {/* Payment Method Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Payment method</h3>

              {paymentCards.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {paymentCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardSelect(card.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedCard === card.id
                          ? "border-blue-500 bg-blue-50"
                          : card.isDefault
                          ? "border-blue-300 bg-blue-25"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="paymentCard"
                          checked={selectedCard === card.id}
                          onChange={() => handleCardSelect(card.id)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex items-center gap-2">
                          {getCardBrandIcon(card.brand)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            Card ending **** {card.last4}
                          </p>
                          <p className="text-sm text-gray-600">
                            Expiry date:{" "}
                            {formatExpiryDate(
                              card.expiryMonth,
                              card.expiryYear
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No payment cards found
                </div>
              )}

              {/* Pay with New Card Button */}
              <div className="flex items-center gap-3 pt-4 ">
                <Button
                  onClick={handlePayWithNewCard}
                  variant="outline"
                  className=""
                >
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={PlusSignCircleIcon}
                      className="w-5 h-5"
                    />
                    <p className="text-gray-700">Pay with a New Card</p>
                  </div>
                </Button>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-background rounded-lg p-4 mb-2">
              <h3 className="text-lg font-medium mb-3">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice Number:</span>
                  <span className="font-medium">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount to Pay:</span>
                  <span className="font-medium text-lg">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 pt-0">
            <Button
              onClick={handlePayNow}
              variant="primary"
              className=""
              disabled={!selectedCard}
            >
              Pay Now
            </Button>
            <Button onClick={handleCancel} variant="outline" className="">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCardChoiceModal;
