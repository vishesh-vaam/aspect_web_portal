import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sorting05Icon,
  FilterIcon,
  MoreVerticalIcon,
  Building01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import Button from "../../components/Button";

// A type for our location data
interface Location {
  id: string;
  label: string;
  address: string;
  townCity: string;
  county: string | null;
  postcode: string;
}

// Mock data based on your screenshot
const mockLocations: Location[] = [
  {
    id: "1",
    label: "Account address",
    address: "E7 Barwell Business Park, Leatherhead Road",
    townCity: "Chessington",
    county: "London",
    postcode: "KT1 1EY",
  },
  {
    id: "2",
    label: "Croydon",
    address: "4 Park Lane",
    townCity: "-",
    county: null,
    postcode: "CR0 1JA",
  },
  {
    id: "3",
    label: "Hammersmith",
    address: "The Old Fire Station, 244 Shepherd's Bush Road",
    townCity: "Hammersmith",
    county: null,
    postcode: "W6 7NL",
  },
  {
    id: "4",
    label: "Kingston",
    address: "16-18 High Street",
    townCity: "Kingston upon Thames",
    county: "London",
    postcode: "KT1 1EY",
  },
  {
    id: "5",
    label: "Soho",
    address: "42 Great Marlborough Street, Soho",
    townCity: "-",
    county: null,
    postcode: "W1F 7JL",
  },
  {
    id: "6",
    label: "Wimbledon",
    address: "46-48 Wimbledon Hill Road",
    townCity: "Wimbledon",
    county: null,
    postcode: "SW19 7PA",
  },
];

const LocationsLayout: React.FC = () => {
  const [locations] = useState<Location[]>(mockLocations);
  const [activeTab, setActiveTab] = useState<"active" | "removed">("active");

  return (
    // The main background is now white
    <div className="min-h-full bg-white">
      {/* --- THIS IS THE FIX --- */}
      {/* Restoring the correct height and relative positioning to the banner container */}
      <div>
        {/* <img src="https://images.unsplash.com/photo-1505761671935-60b3a742750f?q=80&w=2070&auto=format&fit=crop" /> */}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="p-4 md:p-6">
        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                activeTab === "active"
                  ? "bg-white shadow-sm text-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("removed")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                activeTab === "removed"
                  ? "bg-white shadow-sm text-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Removed
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
              <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4 mr-2" />
              Add location
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Location label
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Town/City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  County
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Postcode
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {locations.map((location) => (
                <tr
                  key={location.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary flex items-center gap-2">
                    <HugeiconsIcon icon={Building01Icon} />
                    {location.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.townCity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.county || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.postcode}
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
      </div>
    </div>
  );
};

export default LocationsLayout;
