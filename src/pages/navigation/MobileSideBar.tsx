import React, { useState } from 'react';
import Settings from './Settings';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon } from '@hugeicons/core-free-icons';

Menu01Icon
const MobileSideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg border border-white bg-light-grey text-gray-600 hover:text-gray-900"
        aria-label="Open menu"
      >
        <HugeiconsIcon icon={Menu01Icon} />
      </button>

      {/* Overlay - transparent to keep background visible */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Slide-out Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Settings Content */}
        <div className="h-full overflow-y-auto">
          <Settings />
        </div>
      </div>
    </>
  );
};

export default MobileSideBar;
