import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home03Icon, LicenseIcon, DeliveryTruck02Icon, Analytics01Icon } from '@hugeicons/core-free-icons';

const MobileMainNav: React.FC = () => {
  const menuItems = [
    { name: 'Home', path: "/", icon: <HugeiconsIcon icon={Home03Icon} /> },
    { name: 'Work', path: "/", icon: <HugeiconsIcon icon={LicenseIcon} /> },
    { name: 'New Job', path: "/new-job", icon: <HugeiconsIcon icon={DeliveryTruck02Icon} /> },
    { name: 'Reports', path: "/", icon: <HugeiconsIcon icon={Analytics01Icon} /> },
  ];

  return (
    <nav className="px-4 flex justify-center">
      <div className="flex justify-around items-center min-w-[95vw] bg-white rounded-t-md">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className="flex flex-col items-center py-2 px-3 hover:text-gray-900 transition-colors duration-200"
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MobileMainNav;
