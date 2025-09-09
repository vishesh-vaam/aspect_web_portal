import React, { useState } from "react";
import { useNewJob } from "./NewJobContext";
// 1. Import Firestore functions and the database instance
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";

const BookingDiscount: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();
  const [discountCode, setDiscountCode] = useState("");
  // 2. Add state for loading and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // 3. Query the 'promoCodes' collection
      const promoCodesRef = collection(db, "promoCodes");
      // Find a document where the 'Name' field matches the entered discount code
      const q = query(promoCodesRef, where("Name", "==", discountCode.trim()));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // 4. If a matching code is found
        const promoDoc = querySnapshot.docs[0]; // Get the first match
        const discountAmount = promoDoc.data().Discount_Amount__c;

        // Update the job state with both the code and the amount
        updateJobState({
          appliedDiscountCode: discountCode.trim(),
          appliedDiscountAmount: discountAmount, // Assuming you have this field in your context state
        });
        setDiscountCode(""); // Clear the input field on success
      } else {
        // 5. If no matching code is found
        setError("Invalid discount code. Please try again.");
      }
    } catch (err) {
      console.error("Error applying discount:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveDiscount = () => {
    // Clear both the code and the amount from the state
    updateJobState({ appliedDiscountCode: "", appliedDiscountAmount: 0 });
  };

  return (
    <div className="w-full bg-primary rounded-md shadow-sm">
      <div className="w-full bg-white rounded-md">
        <div className="w-full bg-background rounded-md flex items-center gap-2 px-4 py-2">
          <p className="text-lg font-semibold text-gray-900">% Discounts</p>
        </div>
        <div className="p-4 pb-2 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <TextInput
                value={discountCode}
                onChange={setDiscountCode}
                placeholder="Discount code"
                name="discountCode"
              />
            </div>
            <Button
              onClick={handleApplyDiscount}
              disabled={!discountCode.trim() || isLoading}
              className="px-6"
              variant="outline"
            >
              {isLoading ? "Applying..." : "Apply"}
            </Button>
          </div>
          {/* Display error messages right below the input */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        {/* --- THIS LOGIC IS NOW FIXED --- */}
        {/* Only show the applied message if there's a code AND the amount is greater than 0 */}
        {jobState.appliedDiscountCode && jobState.appliedDiscountAmount > 0 ? (
          <div className="p-1">
            <div className="flex items-center justify-between rounded-md p-3">
              <p className="text-sm">
                Discount of £{jobState.appliedDiscountAmount} is applied with
                code: <strong>{jobState.appliedDiscountCode}</strong>
              </p>
              <button
                onClick={handleRemoveDiscount}
                className="hover:cursor-pointer ml-2"
              >
                <HugeiconsIcon
                  icon={CancelCircleIcon}
                  className="w-5 h-5 text-gray-500 hover:text-red-600"
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-1">
            <div className="rounded-md p-3">
              <p className="text-sm text-center">
                Enter a valid discount code to apply additional savings to your
                booking.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDiscount;
