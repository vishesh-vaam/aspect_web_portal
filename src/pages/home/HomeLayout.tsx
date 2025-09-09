import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  CreditCardIcon,
  Ticket01Icon,
  UserGroupIcon,
  ProfileIcon,
  PlayCircleIcon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import Button from "../../components/Button";
import bannerImg from "../../assets/aspect-home-banner.jpg";

// --- Placeholder Data ---
const locations = [
  { name: "Hammersmith", activeJobs: 3 },
  { name: "Kingston", activeJobs: 2 },
  { name: "Wimbledon", activeJobs: 5 },
];

const HomeLayout: React.FC = () => {
  return (
    <div className="p-4 md:p-6 bg-background min-h-full space-y-6">
      {/* --- Banner Section --- */}
      <div className="relative rounded-lg overflow-hidden shadow-sm">
        {/* Banner Image */}
        <img
          src={bannerImg}
          alt="Aspect van in a city setting"
          className="w-full h-64 object-cover bg-gray-200"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 z-10">
          <p className="text-white text-sm font-medium">September 12-22</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold mt-2">
            Enjoy free home check up this summer
          </h2>
          <p className="text-white mt-2">Discover our range of services</p>
          <Button
            variant="outline"
            className="mt-6 w-fit border-white text-white hover:bg-white hover:text-black"
          >
            Find out more
          </Button>
        </div>

        {/* Navigation Buttons */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white z-10">
          <HugeiconsIcon icon={ArrowLeft02Icon} />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white z-10">
          <HugeiconsIcon icon={ArrowRight02Icon} />
        </button>
      </div>

      {/* --- Action Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Payment overdue</h3>
            <HugeiconsIcon icon={CreditCardIcon} className="text-red-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">Invoice INV-366424</p>
          <Button
            variant="outline"
            className="w-full mt-4 border-red-500 text-red-500 hover:bg-red-50"
          >
            Pay
          </Button>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Credit limit</h3>
            <HugeiconsIcon icon={CreditCardIcon} className="text-red-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">Credit limit exceeded</p>
          <Button
            variant="outline"
            className="w-full mt-4 border-red-500 text-red-500 hover:bg-red-50"
          >
            Pay
          </Button>
        </div>
        <div className="bg-primary p-5 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">New job</h3>
            <HugeiconsIcon icon={Ticket01Icon} />
          </div>
          <p className="text-sm opacity-90 mt-1">Continue where you left off</p>
          <Button
            variant="outline"
            className="w-full mt-4 border-white text-white hover:bg-white hover:text-primary"
            onClick={() => (window.location.href = "/new-job")}
          >
            Continue
          </Button>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Users</h3>
            <HugeiconsIcon icon={UserGroupIcon} className="text-gray-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            James White's invitation is still pending
          </p>
          <Button variant="outline" className="w-full mt-4">
            Resend invite
          </Button>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Profile details</h3>
            <HugeiconsIcon icon={ProfileIcon} className="text-gray-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Complete your profile details
          </p>
          <Button variant="outline" className="w-full mt-4">
            Edit profile
          </Button>
        </div>
      </div>

      {/* --- Lower Section Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg text-gray-800">Start here...</h3>
          <p className="text-sm text-gray-500">Watch our intro to the portal</p>
          <div className="mt-4 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <HugeiconsIcon
              icon={PlayCircleIcon}
              size={64}
              className="text-gray-400"
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {/* <h3 className="font-bold text-lg text-gray-800 mb-4"></h3> */}
          <div className="space-y-4">
            {locations.map((loc) => (
              <div key={loc.name} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{loc.name}</p>
                  <p className="text-xs text-gray-500">
                    {loc.activeJobs} Active jobs
                  </p>
                </div>
                <button className="p-1.5 rounded-md hover:bg-gray-100">
                  <HugeiconsIcon
                    icon={MoreVerticalIcon}
                    className="text-gray-500"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
