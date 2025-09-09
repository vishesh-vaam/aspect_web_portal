import React from "react";
import { useNewJob } from "./NewJobContext";
import Radio from "../../components/Radio"; // Assuming a Radio component exists

const JobOwnerPresence: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();

  // The 'value' is now correctly typed
  const handlePresenceChange = (value: string) => {
    updateJobState({ ownerPresence: value as "yes" | "no" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">Will you be on site?</h2>
      <div className="bg-background p-4 rounded-md">
        <Radio
          options={[
            { label: "Yes, I will be on site", value: "yes" },
            { label: "No, someone else will be on site", value: "no" },
          ]}
          value={jobState.ownerPresence}
          onChange={handlePresenceChange}
        />
      </div>
    </div>
  );
};
export default JobOwnerPresence;
