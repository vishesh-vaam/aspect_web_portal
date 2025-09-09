import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sorting05Icon,
  FilterIcon,
  MoreVerticalIcon,
  UserGroupIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import Button from "../../components/Button";

// A type for our user data
interface User {
  id: string;
  initials: string;
  name: string;
  email: string;
  access: "Manager" | string;
  status: "Active" | "Invited";
  location: string;
  invitedBy: string;
  lastActive: string;
}

// Sub-component for the status pills
const StatusPill: React.FC<{ status: User["status"] }> = ({ status }) => {
  const isInvited = status === "Invited";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        isInvited
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      {status}
    </span>
  );
};

// Mock data based on your screenshot
const mockUsers: User[] = [
  {
    id: "1",
    initials: "AR",
    name: "Arjun Rama",
    email: "arjun.rama@wagamama.com",
    access: "Manager",
    status: "Active",
    location: "Chelmsford",
    invitedBy: "Ben Daldry",
    lastActive: "July 4, 2022",
  },
  {
    id: "2",
    initials: "JW",
    name: "James White",
    email: "james.white@wagamama.com",
    access: "Manager",
    status: "Invited",
    location: "Wimbledon",
    invitedBy: "Ben Daldry",
    lastActive: "July 4, 2022",
  },
  {
    id: "3",
    initials: "JT",
    name: "Jack Templeman",
    email: "jack.templeman@wagamama.com",
    access: "Manager",
    status: "Active",
    location: "Wimbledon",
    invitedBy: "Ben Daldry",
    lastActive: "July 4, 2022",
  },
  {
    id: "4",
    initials: "JL",
    name: "Jean-Luc Drean",
    email: "jean-luc.drean@wagamama.com",
    access: "Manager",
    status: "Active",
    location: "Chelmsford",
    invitedBy: "Ben Daldry",
    lastActive: "July 4, 2022",
  },
  {
    id: "5",
    initials: "JS",
    name: "Jo Sheppard",
    email: "jo.sheppard@wagamama.com",
    access: "Manager",
    status: "Active",
    location: "Wimbledon",
    invitedBy: "Ben Daldry",
    lastActive: "July 4, 2022",
  },
  {
    id: "6",
    initials: "SA",
    name: "Shazia Ahmed",
    email: "shazia.ahmed@wagamama.com",
    access: "Manager",
    status: "Active",
    location: "Kingston upon Thames",
    invitedBy: "Ben Daldry",
    lastActive: "July 4, 2022",
  },
];

const UsersLayout: React.FC = () => {
  const [users] = useState<User[]>(mockUsers);
  const [activeTab, setActiveTab] = useState<"active" | "removed">("active");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (userId: string) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  return (
    <div className="min-h-full bg-white" onClick={() => setOpenDropdown(null)}>
      {/* Banner */}
      <div className="">
        <div className="">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-300/20 p-2 rounded-lg border border-yellow-300">
              <HugeiconsIcon
                icon={UserGroupIcon}
                // className="w-6 h-6 text-yellow-300"
              />
            </div>
            {/* <h1 className="text-3xl md:text-4xl font-bold text-white">Users</h1> */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="">
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
              Add user
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Access
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Location label
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Invited by
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last active
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.access}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusPill status={user.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.invitedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(user.id);
                      }}
                      className="p-1.5 rounded-md hover:bg-gray-200"
                    >
                      <HugeiconsIcon
                        icon={MoreVerticalIcon}
                        className="w-5 h-5 text-gray-500"
                      />
                    </button>
                    {openDropdown === user.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Send invite again
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Cancel invite
                        </a>
                      </div>
                    )}
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

export default UsersLayout;
