import type { Bill } from "../types/types";

type Props = {
  bill: Bill;
};

const Summary = ({ bill }: Props) => {
  if (bill.people.length === 0) return null;

  const totalAssigned = bill.people.reduce((sum, p) => sum + p.amount, 0);
  const remaining = parseFloat((bill.total - totalAssigned).toFixed(2));
  const allPaid = bill.people.every((p) => p.paid);
  const paidAmount = bill.people
    .filter((p) => p.paid)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div
      className="rounded-xl p-5 mt-4"
      style={{ background: "#111", color: "#fff" }}
    >
      <h3
        className="text-sm font-bold mb-4"
        style={{ fontFamily: "monospace", color: "#e8ff00" }}
      >
        Summary
      </h3>

      <div className="flex flex-col gap-2 mb-4">
        {bill.people.map((person) => (
          <div key={person.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: person.paid ? "#22c55e" : "#333",
                  color: person.paid ? "#fff" : "#888",
                }}
              >
                {person.paid ? "paid" : "owes"}
              </span>
              <span className="text-sm">{person.name}</span>
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: person.paid ? "#86efac" : "#fff" }}
            >
              €{person.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div
        className="pt-3 flex flex-col gap-1"
        style={{ borderTop: "1px solid #333" }}
      >
        <div className="flex justify-between text-xs" style={{ color: "#888" }}>
          <span>Bill total</span>
          <span>€{bill.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs" style={{ color: "#888" }}>
          <span>Collected</span>
          <span style={{ color: "#86efac" }}>€{paidAmount.toFixed(2)}</span>
        </div>
        {remaining !== 0 && (
          <div className="flex justify-between text-xs" style={{ color: "#f59e0b" }}>
            <span>Remaining</span>
            <span>€{Math.abs(remaining).toFixed(2)}</span>
          </div>
        )}
      </div>

      {allPaid && (
        <div
          className="mt-4 py-2 rounded text-center text-sm font-bold"
          style={{ background: "#e8ff00", color: "#111" }}
        >
          🎉 All settled up!
        </div>
      )}
    </div>
  );
};

export default Summary;