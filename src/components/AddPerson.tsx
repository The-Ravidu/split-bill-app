import { useState } from "react";
import { useBill } from "../context/BillContext";

type Props = {
  billId: string;
};

const AddPerson = ({ billId }: Props) => {
  const { addPerson } = useBill();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }
    addPerson(billId, name.trim());
    setName("");
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">Add Person</label>

      {error && (
        <p className="text-xs mb-2" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. Ravidu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border rounded text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded text-sm font-bold"
          style={{ background: "#111", color: "#e8ff00" }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddPerson;