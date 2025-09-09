import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNewJob } from "./NewJobContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location09Icon } from "@hugeicons/core-free-icons";
import Button from "../../components/Button";

const BookingPrice: React.FC = () => {
  const { jobState } = useNewJob();

  const [hourlyRate, setHourlyRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRate = async () => {
    if (!jobState.jobType || !jobState.selectedTimeSlot) {
      setError("Please select a trade and a time slot first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHourlyRate(null);

    try {
      const rateCardsRef = collection(db, "tradeRateCards");
      const q = query(
        rateCardsRef,
        where("Trade__r_Name", "==", jobState.jobType)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const rateCardData = querySnapshot.docs[0].data();
        let selectedRate: number | undefined;

        switch (jobState.selectedTimeSlot) {
          case "morning":
            selectedRate = rateCardData.Charge_R1__c;
            break;
          case "afternoon":
            selectedRate = rateCardData.Charge_R2__c;
            break;
          case "evening":
            selectedRate = rateCardData.Charge_R3__c;
            break;
          case "late-night":
            selectedRate = rateCardData.Charge_R3__c;
            break;
          // Evening and Late-Night use the same rate
          default:
            setError(`Invalid time slot value: '${jobState.selectedTimeSlot}'`);
            setIsLoading(false);
            return;
        }

        if (typeof selectedRate === "number") {
          setHourlyRate(selectedRate);
        } else {
          setError(
            `Rate for '${jobState.jobType}' at this time is missing or not a number.`
          );
        }
      } else {
        setError(
          `No rate card found for the trade "${jobState.jobType}". Check for exact match (case-sensitive) in Firestore.`
        );
      }
    } catch (err) {
      console.error("Error fetching rate card:", err);
      setError("An error occurred. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateVAT = (rate: number) =>
    (rate * (jobState.vatRate || 20)) / 100;
  const calculateTotalHourlyRate = (rate: number) => rate + calculateVAT(rate);

  return (
    <div className="w-full bg-primary rounded-md shadow-sm pt-1">
      <div className="w-full bg-white rounded-md">
        <div className="w-full bg-background rounded-md flex items-center gap-2 px-4 py-2">
          <HugeiconsIcon icon={Location09Icon} />
          <p className="text-lg font-semibold text-gray-900">
            Best rate for your location
          </p>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1 min-h-[80px] justify-center">
            {isLoading ? (
              <p className="text-center text-gray-700">Fetching rate...</p>
            ) : error ? (
              <p className="text-center text-red-600 font-medium break-words px-2">
                {error}
              </p>
            ) : hourlyRate !== null ? (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">
                    <b>Hourly rate</b>
                  </p>
                  <p className="font-medium text-gray-900">
                    <b>£{hourlyRate.toFixed(2)}</b>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">
                    VAT ({jobState.vatRate || 20}%)
                  </p>
                  <p className="font-medium text-gray-900">
                    £{calculateVAT(hourlyRate).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Total hourly rate</p>
                  <p className="font-medium text-gray-900">
                    £{calculateTotalHourlyRate(hourlyRate).toFixed(2)}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">
                Please select a trade and time, then check for the price.
              </p>
            )}
          </div>
          <Button
            onClick={handleFetchRate}
            variant="primary"
            disabled={
              !jobState.jobType || !jobState.selectedTimeSlot || isLoading
            }
          >
            {isLoading ? "Checking..." : "Check for price"}
          </Button>
        </div>

        {/* --- 1. DIAGNOSTIC PANEL --- */}
        {/* This section will help us see the exact values being used
        <div className="border-t border-dashed border-gray-300 p-2 text-xs text-gray-500">
          <p className="font-bold text-center mb-1">Debug Info</p>
          <div className="flex justify-between">
            <span>Selected Trade:</span>
            <span className="font-mono bg-gray-100 px-1 rounded">
              {jobState.jobType || "Not selected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Selected Time:</span>
            <span className="font-mono bg-gray-100 px-1 rounded">
              {jobState.selectedTimeSlot || "Not selected"}
            </span>
          </div>
        </div> */}

        <div className="border-t border-gray-200"></div>
        <div className="flex justify-between items-center p-4">
          <p className="text-gray-700">Account discount</p>
          <p className="font-medium text-gray-900">
            {jobState.accountDiscount}%
          </p>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="p-4">
          <p className="text-gray-700">
            A discount applies when we are on-site for:
          </p>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">4 or more hours</p>
            <p className="font-medium text-gray-900">
              {jobState.discount4Hours}%
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">8 or more hours</p>
            <p className="font-medium text-gray-900">
              {jobState.discount8Hours}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPrice;
