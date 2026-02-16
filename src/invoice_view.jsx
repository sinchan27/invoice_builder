import React, { forwardRef } from "react";

const InvoicePreview = forwardRef(({ invoice }, ref) => {
  if (!invoice) return null;

  return (
    // ✅ Attach ref HERE
    <div ref={ref} style={{ backgroundColor: "white", color: "black", padding: "20px" }}>

      {/* Header */}
      <div className="flex justify-between border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold">TAX INVOICE</h1>
        <div>
          <p>Invoice No: {invoice.invoiceno}</p>
          <p>Date: {invoice.date}</p>
        </div>
      </div>

      {/* Company & Customer */}
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="font-bold">From:</h2>
          <p>{invoice.companyname}</p>
          <p>{invoice.companyAddrs}</p>
          <p>GSTIN: {invoice.companyGSTIN}</p>
        </div>

        <div>
          <h2 className="font-bold">Bill To:</h2>
          <p>{invoice.customername}</p>
          <p>{invoice.customerAddrs}</p>
          <p>GSTIN: {invoice.customerGSTIN}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">GST</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.item?.map((i, idx) => (
            <tr key={idx}>
              <td className="border p-2">{i.item}</td>
              <td className="border p-2">{i.quantity}</td>
              <td className="border p-2">{i.Rate}</td>
              <td className="border p-2">{i.amount}</td>
              <td className="border p-2">{i.gst}</td>
              <td className="border p-2">{i.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-right mt-4">
        <p>Subtotal: ₹{invoice.sub}</p>
        <p>Total GST: ₹{invoice.totalgst}</p>
        <h2 className="text-xl font-bold">Grand Total: ₹{invoice.grandtotal}</h2>
      </div>

    </div>
  );
});

export default InvoicePreview;
