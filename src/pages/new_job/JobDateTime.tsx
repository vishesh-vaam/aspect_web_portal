import React from "react";
import DateField from "../../components/Date";
import JobTimeSelect from "./JobTimeSelect";
import { useNewJob } from "./NewJobContext";
import dayjs from "dayjs"; // 1. Import the dayjs library
import type { TimeSlot } from "./NewJobContext";

const JobDateTime: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();

  // 2. This handler now correctly converts the Dayjs object from the date picker
  //    back into a standard JavaScript Date object before saving it to the state.
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    updateJobState({ jobDate: date ? date.toDate() : null });
  };

  const handleTimeChange = (time: TimeSlot) => {
    updateJobState({ selectedTimeSlot: time });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">When do you need us?</h2>
      <div className="bg-background p-4 rounded-md space-y-4">
        <DateField
          label=""
          // 3. This converts the standard Date from the state into a
          //    Dayjs object that the DateField component expects.
          value={jobState.jobDate ? dayjs(jobState.jobDate) : null}
          onChange={handleDateChange}
          placeholder="Select a date"
        />
        <JobTimeSelect
          value={jobState.selectedTimeSlot}
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default JobDateTime;
