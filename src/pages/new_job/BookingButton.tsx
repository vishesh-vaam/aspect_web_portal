import React, { useState } from "react";
import { useNewJob } from "./NewJobContext";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CreditCardIcon } from "@hugeicons/core-free-icons";

interface UserCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

const BookingButton: React.FC = () => {
  const { updateJobState } = useNewJob();
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  // Tentative list of user cards (in real case, this would be fetched from database)
  const userCards: UserCard[] = [
    {
      id: "card_1",
      last4: "4242",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
    },
    {
      id: "card_2",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false,
    },
    {
      id: "card_3",
      last4: "1234",
      brand: "American Express",
      expiryMonth: "03",
      expiryYear: "2024",
      isDefault: false,
    },
  ];

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId);
    updateJobState({ selectedCardId: cardId });
  };

  const handleValidateCard = () => {
    // This would open a modal to add/validate a new card
    console.log("Validate card clicked");
  };

  const handleBookNow = () => {
    // This would process the booking with the selected card
    console.log("Book now clicked with card:", selectedCardId);
  };

  const formatCardOption = (card: UserCard) => ({
    value: card.id,
    label: `${card.brand} ending in ${card.last4}`,
  });

  const cardOptions = userCards.map(formatCardOption);

  return (
    <div className="w-full bg-primary rounded-md shadow-sm pt-1">
      <div className="w-full bg-white rounded-md">
        {/* Section 1: Title */}
        <div className="w-full bg-background rounded-md flex items-center gap-2 px-4 py-2">
          <HugeiconsIcon icon={CreditCardIcon} />
          <p className="text-lg font-semibold text-gray-900">Payment Method</p>
        </div>

        {/* Section 2: Content */}
        <div className="p-4 flex flex-col gap-4">
          {userCards.length > 0 ? (
            <>
              {/* Card Selection */}
              <div className="space-y-2">
                <Select
                  value={selectedCardId}
                  onChange={handleCardSelect}
                  options={cardOptions}
                  placeholder="Choose a card"
                />
              </div>

              {/* Book Now Button */}
              <Button
                onClick={handleBookNow}
                disabled={!selectedCardId}
                className="w-full"
                variant="primary"
              >
                Book Now
              </Button>
            </>
          ) : (
            <>
              {/* No Cards Message */}
              <div className="text-center space-y-3">
                {/* Validate Card Button */}
                <Button
                  onClick={handleValidateCard}
                  className="w-full"
                  variant="primary"
                >
                  Validate a Card
                </Button>
                <p className="text-sm text-gray-700">
                  To book, you will need to validate a card.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingButton;
