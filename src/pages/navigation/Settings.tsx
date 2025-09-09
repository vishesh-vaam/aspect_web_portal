import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Location09Icon,
  UserMultiple03Icon,
  Invoice02Icon,
  SecurityCheckIcon,
  Notification01Icon,
  SquareUnlock02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

const Settings: React.FC = () => {
  const settingsMenuItems = [
    {
      name: "Locations",
      path: "/location",
      icon: <HugeiconsIcon icon={Location09Icon} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <HugeiconsIcon icon={UserMultiple03Icon} />,
    },
    {
      name: "Billing",
      path: "/billing",
      icon: <HugeiconsIcon icon={Invoice02Icon} />,
    },
    {
      name: "Invoice",
      path: "/invoice",
      icon: <HugeiconsIcon icon={SecurityCheckIcon} />,
    },
    {
      name: "Legal",
      path: "/legal",
      icon: <HugeiconsIcon icon={Location09Icon} />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <HugeiconsIcon icon={Notification01Icon} />,
    },
  ];

  return (
    <div className="mt-auto mb-10">
      <hr className="hidden border-t border-gray-200 my-2 lg:block" />
      <h3 className="px-4 py-2">Settings</h3>
      <nav className="px-2">
        {/* Show Profile as another option on small screens */}
        <div className="block lg:hidden">
          <a
            href="/profile"
            className="group flex items-center px-2 py-2 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            <div className="flex items-center gap-2 lg:flex-row flex-row-reverse w-full">
              <span className="text-lg">
                <HugeiconsIcon icon={UserIcon} />
              </span>
              <span>Profile</span>
            </div>
          </a>
        </div>
        {settingsMenuItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className="group flex items-center px-2 py-2 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            <div className="flex items-center gap-2 lg:flex-row flex-row-reverse w-full">
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </a>
        ))}
        {/* Show Log-out as another option on small screens */}
        <div className="block lg:hidden">
          <a
            href="/logout"
            className="group flex items-center px-2 py-2 hover:bg-gray-50 hover:text-gray-900"
          >
            <div className="flex items-center gap-2 lg:flex-row flex-row-reverse w-full">
              <span className="text-lg">
                <HugeiconsIcon icon={SquareUnlock02Icon} />
              </span>
              <span>Log-out</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Settings;
