import type { Person, SplitMode } from "../types/types";
import { useBill } from "../context/BillContext";

type Props = {
  billId: string;
  people: Person[];
  total: number;
  mode: SplitMode;
};

const PeopleList = ({ billId, people, total, mode }: Props) => {
  const { removePerson, togglePaid, updateCustomAmount } = useBill();

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
                  flexShrink: 0,
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

                {mode === "custom" ? (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-400">€</span>
                    <input
                      type="number"
                      value={person.amount}
                      min="0"
                      onChange={(e) =>
                        updateCustomAmount(
                          billId,
                          person.id,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-20 p-1 text-xs border rounded"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">
                    €{person.amount.toFixed(2)}
                  </p>
                )}
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
        <p className="text-xs text-center py-2 rounded" style={{ color: "#f59e0b", background: "#fffbeb" }}>
          ⚠ €{Math.abs(remaining).toFixed(2)}{" "}
          {remaining > 0 ? "still unassigned" : "over the total"}
        </p>
      )}
    </div>
  );
};

export default PeopleList;