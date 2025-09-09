import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Button from "../../components/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterIcon,
  Sorting05Icon,
  Download05Icon,
  MoreVerticalIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import CreditCardChoiceModal from "./CreditCardChoiceModal";

// --- Interfaces for data types ---
interface Invoice {
  id: string;
  number: string;
  jobRef: string;
  date: string;
  amount: number;
  status: "Paid" | "Outstanding" | string; // Allow for other statuses
  due: number;
}

interface CreditNote {
  id: string;
  number: string;
  invoiceNumber: string;
  jobRef: string;
  date: string;
  amount: number;
}

// --- Dropdown Component ---
interface ActionDropdownProps {
  itemId: string;
  itemType: "invoice" | "creditNote";
  status?: string;
  isOpen: boolean;
  onToggle: (itemId: string) => void;
  onView: (itemId: string) => void;
  onPay: (itemId: string) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  itemId,
  itemType,
  status,
  isOpen,
  onToggle,
  onView,
  onPay,
}) => {
  const dropdownId = `${itemType}-${itemId}`;
  return (
    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 z-50">
      <div className="relative">
        <button
          onClick={() => onToggle(dropdownId)}
          className="p-1 hover:bg-gray-200 rounded-md transition-colors"
        >
          <HugeiconsIcon
            icon={MoreVerticalIcon}
            className="w-4 h-4 text-gray-600"
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-[100]">
            <button
              onClick={() => onView(itemId)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-t-md"
            >
              View
            </button>
            {itemType === "invoice" && status !== "Paid" && (
              <button
                onClick={() => onPay(itemId)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-b-md"
              >
                Pay
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const InvoiceList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"invoice" | "creditNotes">(
    "invoice"
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] =
    useState<Invoice | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch Invoices
        const invoicesCollectionRef = collection(db, "customerInvoices");
        const invoiceSnapshot = await getDocs(invoicesCollectionRef);
        const fetchedInvoices = invoiceSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            number: data.Name || "N/A",
            jobRef: data.Job__r_Name || "N/A",
            date: data.Date__c || "N/A",
            amount: data.Total_Amount_with_VAT__c || 0,
            status: data.Status__c || "Unknown",
            due: data.Balance_Outstanding_with_Interest__c || 0,
          } as Invoice;
        });
        setInvoices(fetchedInvoices);

        // Fetch Credit Notes
        const creditNotesCollectionRef = collection(db, "customerCreditNotes");
        const creditNoteSnapshot = await getDocs(creditNotesCollectionRef);
        const fetchedCreditNotes = creditNoteSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            number: data.Name || "N/A",
            invoiceNumber: data.Invoice_Number__c || "N/A",
            jobRef: data.Job_Number__c || "N/A",
            date: data.Date__c || "N/A",
            amount: data.Amount__c || 0,
          } as CreditNote;
        });
        setCreditNotes(fetchedCreditNotes);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to load data. Please check your connection and Firestore rules."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Pagination Logic ---
  const handleTabChange = (tab: "invoice" | "creditNotes") => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab switch
  };

  const activeList = activeTab === "invoice" ? invoices : creditNotes;
  const totalPages = Math.ceil(activeList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeList.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // --- Helper Functions ---
  const handleSort = () => console.log("Sort clicked");
  const handleFilter = () => console.log("Filter clicked");
  const handleAccountStatement = () => console.log("Account Statement clicked");
  const toggleDropdown = (itemId: string) =>
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  const closeDropdown = () => setOpenDropdown(null);
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedInvoiceForPayment(null);
  };
  const toggleExpandedItem = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };
  const handleView = (itemId: string) => {
    console.log("View clicked for item:", itemId);
    closeDropdown();
  };
  const handlePay = (itemId: string) => {
    const invoice = invoices.find((inv) => inv.id === itemId);
    if (invoice) {
      setSelectedInvoiceForPayment(invoice);
      setIsPaymentModalOpen(true);
    }
    closeDropdown();
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-green-600 bg-green-100";
      case "Outstanding":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            className="w-4 h-4 text-green-600"
          />
        );
      case "Outstanding":
        return (
          <HugeiconsIcon
            icon={AlertCircleIcon}
            className="w-4 h-4 text-red-600"
          />
        );
      default:
        return null;
    }
  };
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);

  return (
    <div className="p-2 lg:p-6" onClick={closeDropdown}>
      <div className="flex gap-4 mb-6">
        <div className="flex bg-white rounded-md p-2 gap-2">
          <button
            onClick={() => handleTabChange("invoice")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "invoice"
                ? "bg-accent text-primary border"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => handleTabChange("creditNotes")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "creditNotes"
                ? "bg-accent text-primary border"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Credit Notes
          </button>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button onClick={handleSort} variant="outline" size="sm">
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={Sorting05Icon} className="w-4 h-4" />
              <span className="hidden md:block">Sort</span>
            </div>
          </Button>
          <Button onClick={handleFilter} variant="outline" size="sm">
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
              <span className="hidden md:block">Filter</span>
            </div>
          </Button>
          <Button onClick={handleAccountStatement} variant="primary" size="sm">
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={Download05Icon} className="w-4 h-4" />
              <span className="hidden md:block">Account Statement</span>
            </div>
          </Button>
        </div>
      </div>

      {isLoading && <div className="text-center p-10">Loading data...</div>}
      {error && <div className="text-center p-10 text-red-600">{error}</div>}

      {!isLoading && !error && (
        <>
          <div className="overflow-x-auto">
            {activeTab === "invoice" ? (
              <div className="min-w-full">
                <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                  <div className="text-center">Number</div>
                  <div className="text-center">Job Ref.</div>
                  <div className="text-center">Date</div>
                  <div className="text-center">Amount</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">Due</div>
                </div>
                <div className="md:hidden grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                  <div className="text-center">Number</div>
                  <div className="text-center">Date</div>
                  <div className="text-center">Amount</div>
                  <div className="text-center">Status</div>
                  <div className="text-center"></div>
                </div>
                {currentItems.map((item) => {
                  const invoice = item as Invoice;
                  return (
                    <div key={invoice.id}>
                      <div
                        className={`hidden md:grid relative grid-cols-6 gap-4 p-4 my-2 border-b rounded-md border-gray-200 hover:bg-gray-50 transition-colors ${
                          invoice.status === "Outstanding"
                            ? "bg-red-50"
                            : "bg-white"
                        }`}
                      >
                        <div className="font-medium flex justify-center items-center">
                          {invoice.number}
                        </div>
                        <div className="text-gray-700 flex justify-center items-center">
                          {invoice.jobRef}
                        </div>
                        <div className="text-gray-700 flex justify-center items-center">
                          {new Date(invoice.date).toLocaleDateString()}
                        </div>
                        <div className="font-medium flex justify-center items-center">
                          {formatCurrency(invoice.amount)}
                        </div>
                        <div className="flex items-center justify-center text-xs font-medium">
                          <span
                            className={`text-center px-1.5 py-1 rounded-md flex items-center gap-1 ${getStatusColor(
                              invoice.status
                            )}`}
                          >
                            {invoice.status}
                          </span>
                        </div>
                        <div className="font-medium flex justify-center items-center">
                          {formatCurrency(invoice.due)}
                        </div>
                        <ActionDropdown
                          itemId={invoice.id}
                          itemType="invoice"
                          status={invoice.status}
                          isOpen={openDropdown === `invoice-${invoice.id}`}
                          onToggle={toggleDropdown}
                          onView={handleView}
                          onPay={handlePay}
                        />
                      </div>
                      <div
                        className={`md:hidden ${
                          invoice.status === "Outstanding"
                            ? "bg-red-50"
                            : "bg-white"
                        } my-2 border-b rounded-md border-gray-200`}
                      >
                        <div
                          onClick={() => toggleExpandedItem(invoice.id)}
                          className={`grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer`}
                        >
                          <div className="font-medium flex justify-center items-center">
                            {invoice.number}
                          </div>
                          <div className="text-gray-700 flex justify-center items-center">
                            {new Date(invoice.date).toLocaleDateString()}
                          </div>
                          <div className="font-medium flex justify-center items-center">
                            {formatCurrency(invoice.amount)}
                          </div>
                          <div className="flex items-center justify-center text-xs font-medium">
                            <span
                              className={`text-center px-1.5 py-1 rounded-md flex items-center gap-1 ${getStatusColor(
                                invoice.status
                              )}`}
                            >
                              {getStatusIcon(invoice.status)}
                            </span>
                          </div>
                          <div className="flex justify-center items-center">
                            <HugeiconsIcon
                              icon={
                                expandedItems.has(invoice.id)
                                  ? ArrowUp01Icon
                                  : ArrowDown01Icon
                              }
                              className="w-4 h-4 text-gray-600"
                            />
                          </div>
                        </div>
                        {expandedItems.has(invoice.id) && (
                          <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">
                                  Job Reference:
                                </span>
                                <span className="font-medium">
                                  {invoice.jobRef}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">
                                  Due:
                                </span>
                                <span className="font-medium">
                                  {formatCurrency(invoice.due)}
                                </span>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  onClick={() => handleView(invoice.id)}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                >
                                  View
                                </Button>
                                {invoice.status !== "Paid" && (
                                  <Button
                                    onClick={() => handlePay(invoice.id)}
                                    variant="primary"
                                    size="sm"
                                    className="flex-1"
                                  >
                                    Pay
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="min-w-full">
                <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                  <div className="text-center">Number</div>
                  <div className="text-center">Invoice Number</div>
                  <div className="text-center">Job Ref</div>
                  <div className="text-center">Date</div>
                  <div className="text-center">Amount</div>
                </div>
                <div className="md:hidden grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                  <div className="text-center">Number</div>
                  <div className="text-center">Invoice Number</div>
                  <div className="text-center">Job Ref</div>
                  <div className="text-center">Date</div>
                  <div className="text-center"></div>
                </div>
                {currentItems.map((item) => {
                  const creditNote = item as CreditNote;
                  return (
                    <div key={creditNote.id}>
                      <div className="hidden md:grid relative grid-cols-5 gap-4 my-2 p-4 bg-white rounded-md border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-center">
                          {creditNote.number}
                        </div>
                        <div className="text-gray-700 text-center">
                          {creditNote.invoiceNumber}
                        </div>
                        <div className="text-gray-700 text-center">
                          {creditNote.jobRef}
                        </div>
                        <div className="text-gray-700 text-center">
                          {new Date(creditNote.date).toLocaleDateString()}
                        </div>
                        <div className="font-medium text-center">
                          {formatCurrency(creditNote.amount)}
                        </div>
                        <ActionDropdown
                          itemId={creditNote.id}
                          itemType="creditNote"
                          isOpen={
                            openDropdown === `creditNote-${creditNote.id}`
                          }
                          onToggle={toggleDropdown}
                          onView={handleView}
                          onPay={handlePay}
                        />
                      </div>
                      <div className="md:hidden bg-white my-2 border-b rounded-md border-gray-200">
                        <div
                          onClick={() => toggleExpandedItem(creditNote.id)}
                          className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="font-medium text-center">
                            {creditNote.number}
                          </div>
                          <div className="text-gray-700 text-center">
                            {creditNote.invoiceNumber}
                          </div>
                          <div className="text-gray-700 text-center">
                            {creditNote.jobRef}
                          </div>
                          <div className="text-gray-700 text-center">
                            {new Date(creditNote.date).toLocaleDateString()}
                          </div>
                          <div className="flex justify-center items-center">
                            <HugeiconsIcon
                              icon={
                                expandedItems.has(creditNote.id)
                                  ? ArrowUp01Icon
                                  : ArrowDown01Icon
                              }
                              className="w-4 h-4 text-gray-600"
                            />
                          </div>
                        </div>
                        {expandedItems.has(creditNote.id) && (
                          <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">
                                  Amount:
                                </span>
                                <span className="font-medium">
                                  {formatCurrency(creditNote.amount)}
                                </span>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  onClick={() => handleView(creditNote.id)}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {activeList.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-6">
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                variant="outline"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {openDropdown && (
        <div className="fixed inset-0 z-40" onClick={closeDropdown} />
      )}
      {selectedInvoiceForPayment && (
        <CreditCardChoiceModal
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          invoiceNumber={selectedInvoiceForPayment.number}
          amount={selectedInvoiceForPayment.due}
        />
      )}
    </div>
  );
};

export default InvoiceList;
