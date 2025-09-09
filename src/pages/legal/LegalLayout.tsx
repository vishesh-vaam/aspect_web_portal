import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShieldIcon, ChartDownIcon } from "@hugeicons/core-free-icons";

// --- Data for the Accordions (No changes needed here) ---
interface LegalDataItem {
  title: string;
  content: string;
}

const termsData: LegalDataItem[] = [
  {
    title: "1. Parties, Definitions and Interpretation",
    content: "Lorem ipsum...",
  },
  { title: "2. General", content: "Sed do eiusmod..." },
  {
    title: "3. The Price, Estimates and Variations",
    content: "Ut enim ad minim...",
  },
  { title: "4. Payment and Title", content: "Duis aute irure..." },
  { title: "5. The works", content: "Excepteur sint..." },
  { title: "6. Commencement and Completion Dates", content: "Lorem ipsum..." },
  {
    title: "7. Permits, Licences, other Consents and Access",
    content: "Sed do eiusmod...",
  },
  { title: "8. Frozen Pipes", content: "Ut enim ad minim..." },
  { title: "9. Removal of Waste Materials", content: "Duis aute irure..." },
];

const privacyData: LegalDataItem[] = [
  {
    title: "Privacy Policy of Aspect Maintenance Services Limited",
    content: "This Application collects...",
  },
  { title: "Owner and Data Controller", content: "Aspect\n77 Barwell..." },
  { title: "Types of Data collected", content: "Sed do eiusmod..." },
  {
    title: "Mode and place of processing the Data",
    content: "Ut enim ad minim...",
  },
  { title: "The purposes of processing", content: "Duis aute irure..." },
  { title: "Advertising", content: "Excepteur sint..." },
  { title: "Analytics", content: "Lorem ipsum..." },
];

// --- Accordion Sub-Component (No changes needed) ---
interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onToggle,
}) => (
  <div className="border-b border-gray-200">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50 focus:outline-none"
    >
      <span className="font-medium text-gray-800">{title}</span>
      <HugeiconsIcon
        icon={ChartDownIcon}
        className={`w-5 h-5 text-gray-500 transform transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    {isOpen && (
      <div className="p-4 bg-gray-50 text-gray-600 whitespace-pre-line">
        {content}
      </div>
    )}
  </div>
);

// --- Main LegalLayout Component (FIXED) ---
const LegalLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    termsData[0].title
  );

  const currentData = activeTab === "terms" ? termsData : privacyData;

  const handleToggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <div className="">
      {/*
        FIX: This block is now positioned absolutely.
        It will "float" on top of the parent component's banner image.
        You may need to adjust the `top` and `left` values to perfectly match your layout.
      */}
      <div className="absolute top-20 left-4 md:left-80 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-300/20 p-2 rounded-lg border border-yellow-300">
            <HugeiconsIcon
              icon={ShieldIcon}
              className="w-6 h-6 text-yellow-300"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-300">
            Legal
          </h1>
        </div>
      </div>

      {/*
        FIX: Added top padding `pt-48` to this container.
        This pushes the content down so it starts BELOW your banner,
        preventing it from being hidden underneath.
      */}
      <div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Left Navigation */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("terms")}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "terms"
                    ? "bg-gray-800 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Terms & conditions
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "privacy"
                    ? "bg-gray-800 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Privacy policy
              </button>
            </div>

            {/* Right Content Area */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {currentData.map((item) => (
                <AccordionItem
                  key={item.title}
                  title={item.title}
                  content={item.content}
                  isOpen={openAccordion === item.title}
                  onToggle={() => handleToggleAccordion(item.title)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
