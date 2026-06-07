import type { Person } from "../types/types";
import { useBill } from "../context/BillContext";

type Props = {
  billId: string;
  people: Person[];
  total: number;
};

const PeopleList = ({ billId, people, total }: Props) => {
  const { removePerson, togglePaid } = useBill();

  if (people.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        No people added yet. Add someone above!
      </p>
    );
  }

  const totalAssigned = people.reduce((sum, p) => sum + p.amount, 0);
  const remaining = parseFloat((total - totalAssigned).toFixed(2));

  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between p-3 rounded-lg"
            style={{
              background: person.paid ? "#f0fdf4" : "#f8f8f8",
              border: `1px solid ${person.paid ? "#86efac" : "#e0e0e0"}`,
            }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => togglePaid(billId, person.id)}
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs"
                style={{
                  background: person.paid ? "#22c55e" : "#fff",
                  borderColor: person.paid ? "#22c55e" : "#ccc",
                  color: "#fff",
                }}
              >
                {person.paid ? "✓" : ""}
              </button>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{
                    textDecoration: person.paid ? "line-through" : "none",
                    color: person.paid ? "#aaa" : "#111",
                  }}
                >
                  {person.name}
                </p>
                <p className="text-xs text-gray-400">
                  €{person.amount.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => removePerson(billId, person.id)}
              className="text-xs px-2 py-1 rounded"
              style={{ background: "#fee2e2", color: "#ef4444" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {remaining !== 0 && (
        <p className="text-xs text-center" style={{ color: "#f59e0b" }}>
          ⚠ €{Math.abs(remaining).toFixed(2)}{" "}
          {remaining > 0 ? "unassigned" : "over assigned"}
        </p>
      )}
    </div>
  );
};

export default PeopleList;