import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sorting05Icon,
  FilterIcon,
  MoreVerticalIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  HourglassIcon,
} from "@hugeicons/core-free-icons";
import Button from "../../components/Button";

// A type for our job data
interface Job {
  id: string;
  folder: string;
  jobId: string;
  jobRef: string;
  date: string;
  status: "On-site" | "Pending" | "Payment outstanding" | "Completed";
  cost: number | null;
}

// A sub-component to render the colored status pills
const StatusPill: React.FC<{ status: Job["status"] }> = ({ status }) => {
  const statusStyles = {
    "On-site": { icon: HourglassIcon, color: "text-green-800 bg-green-100" },
    Pending: { icon: AlertCircleIcon, color: "text-yellow-800 bg-yellow-100" },
    "Payment outstanding": {
      icon: AlertCircleIcon,
      color: "text-orange-800 bg-orange-100",
    },
    Completed: {
      icon: CheckmarkCircle02Icon,
      color: "text-gray-800 bg-gray-100",
    },
  };

  const style = statusStyles[status] || statusStyles["Completed"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.color}`}
    >
      <HugeiconsIcon icon={style.icon} className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

// Mock data based on your screenshot
const mockJobs: Job[] = [
  {
    id: "1",
    folder: "Damp & Mould",
    jobId: "J-223101",
    jobRef: "J-223101",
    date: "Jun 10, 2025 - Aug 25, 2025",
    status: "On-site",
    cost: 500.0,
  },
  {
    id: "2",
    folder: "Damp & Mould",
    jobId: "J-223101",
    jobRef: "J-223101",
    date: "Jun 10, 2025 - Aug 25, 2025",
    status: "Pending",
    cost: null,
  },
  {
    id: "3",
    folder: "Damp & Mould",
    jobId: "J-223101",
    jobRef: "J-223101",
    date: "Jun 10, 2025 - Aug 25, 2025",
    status: "Pending",
    cost: null,
  },
  {
    id: "4",
    folder: "Damp & Mould",
    jobId: "J-223101",
    jobRef: "J-223101",
    date: "Jun 10, 2025 - Aug 25, 2025",
    status: "Payment outstanding",
    cost: null,
  },
  {
    id: "5",
    folder: "Damp & Mould",
    jobId: "J-223101",
    jobRef: "J-223101",
    date: "Jun 10, 2025 - Aug 25, 2025",
    status: "Completed",
    cost: null,
  },
];

const WorkLayout: React.FC = () => {
  const [jobs] = useState<Job[]>(mockJobs);
  const [activeTab, setActiveTab] = useState<
    "folders" | "jobs" | "attendances"
  >("folders");

  return (
    <div className="p-4 md:p-6 bg-white min-h-full">
      {/* Header with Tabs and Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center border-b border-gray-200">
          <button
            onClick={() => setActiveTab("folders")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "folders"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Folders
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "jobs"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Jobs
          </button>
          <button
            onClick={() => setActiveTab("attendances")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "attendances"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Attendances
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={Sorting05Icon} className="w-4 h-4 mr-2" />
            Sort
          </Button>
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={FilterIcon} className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="primary" size="sm">
            New folder
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Folders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job(s)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost to date
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {job.folder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.jobId}, {job.jobRef}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusPill status={job.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.cost ? `£${job.cost.toFixed(2)}` : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="p-1.5 rounded-md hover:bg-gray-200">
                    <HugeiconsIcon
                      icon={MoreVerticalIcon}
                      className="w-5 h-5 text-gray-500"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" size="sm">
          &lt; Previous
        </Button>
        <div className="flex items-center gap-2 text-sm">
          <a href="#" className="text-gray-500 hover:text-primary">
            01
          </a>
          <a
            href="#"
            className="bg-accent text-primary px-2.5 py-1 rounded-md font-medium"
          >
            02
          </a>
          <a href="#" className="text-gray-500 hover:text-primary">
            03
          </a>
          <span className="text-gray-500">...</span>
          <a href="#" className="text-gray-500 hover:text-primary">
            11
          </a>
        </div>
        <Button variant="outline" size="sm">
          Next &gt;
        </Button>
      </div>
    </div>
  );
};

export default WorkLayout;
