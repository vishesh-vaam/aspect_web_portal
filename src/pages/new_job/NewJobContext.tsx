import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// The TimeSlot type is now correctly lowercase.
export type TimeSlot = "morning" | "afternoon" | "evening" | "late-night" | "";

// This is the main fix: All missing properties have been added.
export interface JobState {
  jobType: string;
  jobDescription: string;
  selectedProperty: string;
  jobDate: Date | null;
  selectedTimeSlot: TimeSlot;
  appliedDiscountCode: string;
  appliedDiscountAmount: number; // Typo 'disount' is now 'discount'
  vatRate: number;
  accountDiscount: number;
  discount4Hours: number;
  discount8Hours: number;
  // --- NEWLY ADDED PROPERTIES ---
  selectedCardId: string;
  additionalDetails: string;
  images: any[]; // Using 'any' for simplicity with file uploads
  ownerPresence: "yes" | "no" | "";
  poNumber: string;
}

interface NewJobContextType {
  jobState: JobState;
  updateJobState: (updates: Partial<JobState>) => void;
}

const NewJobContext = createContext<NewJobContextType | undefined>(undefined);

// The initial state now includes default values for the new properties.
const initialState: JobState = {
  jobType: "",
  jobDescription: "",
  selectedProperty: "",
  jobDate: null,
  selectedTimeSlot: "",
  appliedDiscountCode: "",
  appliedDiscountAmount: 0,
  vatRate: 20,
  accountDiscount: 5,
  discount4Hours: 5,
  discount8Hours: 10,
  selectedCardId: "",
  additionalDetails: "",
  images: [],
  ownerPresence: "",
  poNumber: "",
};

export const NewJobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobState, setJobState] = useState<JobState>(initialState);
  const updateJobState = (updates: Partial<JobState>) => {
    setJobState((prevState) => ({ ...prevState, ...updates }));
  };
  return (
    <NewJobContext.Provider value={{ jobState, updateJobState }}>
      {children}
    </NewJobContext.Provider>
  );
};

export const useNewJob = (): NewJobContextType => {
  const context = useContext(NewJobContext);
  if (!context) {
    throw new Error("useNewJob must be used within a NewJobProvider");
  }
  return context;
};
