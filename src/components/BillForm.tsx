import { useState } from "react";
import { useBill } from "../context/BillContext";

const BillForm = () => {
  const { addBill } = useBill();
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Please enter a bill title.");
      return;
    }
    if (!total || parseFloat(total) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    addBill(title.trim(), parseFloat(total));
    setTitle("");
    setTotal("");
    setError("");
  };

  return (
    <div
      className="rounded-xl p-6 mb-6"
      style={{ background: "#fff", border: "1px solid #e0e0e0" }}
    >
      <h2
        className="text-lg font-bold mb-4"
        style={{ fontFamily: "monospace" }}
      >
        New Bill
      </h2>

      {error && (
        <p className="text-sm mb-3" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Bill Title</label>
        <input
          type="text"
          placeholder="e.g. Dinner at Zaza"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Total Amount (€)
        </label>
        <input
          type="number"
          placeholder="e.g. 84.50"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          className="w-full p-2 border rounded text-sm"
          min="0"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 rounded font-bold text-sm"
        style={{ background: "#111", color: "#e8ff00" }}
      >
        Create Bill
      </button>
    </div>
  );
};

export default BillForm;