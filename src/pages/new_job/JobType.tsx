import React, { useState, useEffect } from "react";
// 1. Import Firestore functions and the database instance
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import { useNewJob } from "./NewJobContext";

const JobType: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();

  // 2. Set up state for trades, loading status, and errors
  const [tradeOptions, setTradeOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Fetch data from Firestore when the component loads
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const tradesCollectionRef = collection(db, "trades");
        const querySnapshot = await getDocs(tradesCollectionRef);

        // 4. Map the fetched documents to the { value, label } format
        const trades = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            value: data.Name, // Use the trade name for both value and label
            label: data.Name,
          };
        });
        setTradeOptions(trades);
        setError(null);
      } catch (err) {
        console.error("Error fetching trades:", err);
        setError("Failed to load trades. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrades();
  }, []); // Empty array ensures this runs only once

  const handleTradeChange = (value: string) => {
    updateJobState({ jobType: value });
  };

  const handleDescriptionChange = (value: string) => {
    updateJobState({ jobDescription: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">What work is required?</h2>
      <div className="bg-background p-4 rounded-md flex flex-col gap-3">
        <Select
          value={jobState.jobType}
          onChange={handleTradeChange}
          options={tradeOptions} // 5. Use the state for options
          label=""
          className="bg-white"
          placeholder={isLoading ? "Loading trades..." : "Select a trade"}
          required
          disabled={isLoading || !!error}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <TextArea
          value={jobState.jobDescription}
          onChange={handleDescriptionChange}
          label=""
          placeholder="All additional information about the required work will help make the booking process smoother"
        />
      </div>
    </div>
  );
};

export default JobType;
