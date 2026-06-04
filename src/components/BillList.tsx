import { useBill } from "../context/BillContext";

const BillList = () => {
  const { state, setActiveBill, removeBill } = useBill();

  if (state.bills.length === 0) {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{ background: "#fff", border: "1px solid #e0e0e0" }}
      >
        <p className="text-4xl mb-2">🧾</p>
        <p className="text-sm text-gray-400">No bills yet. Create one above!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {state.bills.map((bill) => (
        <div
          key={bill.id}
          onClick={() => setActiveBill(bill.id)}
          className="rounded-xl p-4 cursor-pointer flex items-center justify-between"
          style={{
            background: "#fff",
            border: `2px solid ${state.activeBillId === bill.id ? "#e8ff00" : "#e0e0e0"}`,
          }}
        >
          <div>
            <p className="font-bold text-sm">{bill.title}</p>
            <p className="text-xs text-gray-400">
              €{bill.total.toFixed(2)} · {bill.people.length} people · {bill.createdAt}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              removeBill(bill.id);
            }}
            className="text-xs px-2 py-1 rounded"
            style={{ background: "#fee2e2", color: "#ef4444" }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default BillList;