import React from "react";
import InvoiceList from "./InvoiceList";

const InvoiceLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto">
        <InvoiceList />
      </div>
    </div>
  );
};

export default InvoiceLayout;
