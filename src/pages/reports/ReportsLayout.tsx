import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sorting05Icon,
  FilterIcon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import Button from "../../components/Button";

// A placeholder type for our report data
interface Report {
  id: string;
  name: string;
  job: string;
  appointment: string;
  location: string;
  date: string;
}

// Hardcoded data based on your Figma design
const mockReports: Report[] = [
  {
    id: "1",
    name: "Dump report",
    job: "#45692",
    appointment: "Aug 07, 2025",
    location: "Chelmsford",
    date: "Aug 07, 2025",
  },
  {
    id: "2",
    name: "Leak report",
    job: "#45697",
    appointment: "Aug 07, 2025",
    location: "Graysbrook",
    date: "Aug 07, 2025",
  },
  {
    id: "3",
    name: "Leak report",
    job: "#45697",
    appointment: "Aug 07, 2025",
    location: "Graysbrook",
    date: "Aug 07, 2025",
  },
  {
    id: "4",
    name: "Leak report",
    job: "#45697",
    appointment: "Aug 07, 2025",
    location: "Graysbrook",
    date: "Aug 07, 2025",
  },
  {
    id: "5",
    name: "Leak report",
    job: "#45697",
    appointment: "Aug 07, 2025",
    location: "Graysbrook",
    date: "Aug 07, 2025",
  },
  {
    id: "6",
    name: "Leak report",
    job: "#45697",
    appointment: "Aug 07, 2025",
    location: "Graysbrook",
    date: "Aug 07, 2025",
  },
  {
    id: "7",
    name: "Leak report",
    job: "#45697",
    appointment: "Aug 07, 2025",
    location: "Graysbrook",
    date: "Aug 07, 2025",
  },
];

// --- 1. ACTION DROPDOWN COMPONENT ---
// This is a new sub-component to handle the dropdown menu for each report
interface ActionDropdownProps {
  reportId: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onView: (id: string) => void;
  onDownload: (id: string) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  reportId,
  isOpen,
  onToggle,
  onView,
  onDownload,
}) => {
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from bubbling up to the main div
          onToggle(reportId);
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
      >
        <HugeiconsIcon
          icon={MoreVerticalIcon}
          className="w-5 h-5 text-gray-500"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-20">
          <button
            onClick={() => onView(reportId)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            View
          </button>
          <button
            onClick={() => onDownload(reportId)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

const ReportsLayout: React.FC = () => {
  const [reports] = useState<Report[]>(mockReports);
  // --- 2. STATE TO MANAGE OPEN DROPDOWN ---
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (reportId: string) => {
    setOpenDropdown(openDropdown === reportId ? null : reportId);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // Placeholder functions for actions
  const handleView = (reportId: string) => {
    console.log(`Viewing report: ${reportId}`);
    closeDropdown();
  };
  const handleDownload = (reportId: string) => {
    console.log(`Downloading report: ${reportId}`);
    closeDropdown();
  };

  return (
    // Add an onClick handler to the main container to close the dropdown
    <div
      className="p-4 md:p-6 bg-background min-h-full"
      onClick={closeDropdown}
    >
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-md">
              <HugeiconsIcon icon={Sorting05Icon} className="w-4 h-4 mr-2" />
              Sort
            </Button>
            <Button variant="outline" size="sm" className="rounded-md">
              <HugeiconsIcon icon={FilterIcon} className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Job
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Appointment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                {/* --- 3. NEW HEADER FOR ACTIONS COLUMN --- */}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.job}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.appointment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  {/* --- 4. NEW CELL FOR THE ACTION DROPDOWN --- */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ActionDropdown
                      reportId={report.id}
                      isOpen={openDropdown === report.id}
                      onToggle={toggleDropdown}
                      onView={handleView}
                      onDownload={handleDownload}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{reports.length}</span> of{" "}
              <span className="font-medium">{reports.length}</span> results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              &lt; Prev
            </Button>
            <Button variant="outline" size="sm">
              Next &gt;
            </Button>
          </div>
        </div>
      </div>

      {/* --- 5. OVERLAY (optional but good practice) --- */}
      {/* This invisible layer helps close the dropdown when clicking anywhere else on the page */}
      {openDropdown && (
        <div className="fixed inset-0 z-10" onClick={closeDropdown} />
      )}
    </div>
  );
};

export default ReportsLayout;
