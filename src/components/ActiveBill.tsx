import { useBill } from "../context/BillContext";
import AddPerson from "./AddPerson";
import PeopleList from "./PeopleList";

const ActiveBill = () => {
  const { state } = useBill();

  const activeBill = state.bills.find((b) => b.id === state.activeBillId);

  if (!activeBill) {
    return (
      <div
        className="rounded-xl p-6 text-center mt-6"
        style={{ background: "#fff", border: "1px solid #e0e0e0" }}
      >
        <p className="text-4xl mb-2">👆</p>
        <p className="text-sm text-gray-400">
          Select a bill above to manage people
        </p>
      </div>
    );
  }

  const paidCount = activeBill.people.filter((p) => p.paid).length;

  return (
    <div
      className="rounded-xl p-6 mt-6"
      style={{ background: "#fff", border: "1px solid #e0e0e0" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "monospace" }}
          >
            {activeBill.title}
          </h2>
          <p className="text-sm text-gray-400">
            Total: €{activeBill.total.toFixed(2)} · {paidCount}/
            {activeBill.people.length} paid
          </p>
        </div>

        {activeBill.people.length > 0 && paidCount === activeBill.people.length && (
          <span
            className="text-xs px-3 py-1 rounded-full font-bold"
            style={{ background: "#e8ff00", color: "#111" }}
          >
            ✓ All paid!
          </span>
        )}
      </div>

      <AddPerson billId={activeBill.id} />
      <PeopleList
        billId={activeBill.id}
        people={activeBill.people}
        total={activeBill.total}
      />
    </div>
  );
};

export default ActiveBill;