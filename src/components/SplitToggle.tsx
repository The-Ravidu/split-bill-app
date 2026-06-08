import type { SplitMode } from "../types/types";

type Props = {
  mode: SplitMode;
  onChange: (mode: SplitMode) => void;
};

const SplitToggle = ({ mode, onChange }: Props) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onChange("equal")}
        className="flex-1 py-2 rounded text-sm font-bold"
        style={{
          background: mode === "equal" ? "#111" : "#f0f0f0",
          color: mode === "equal" ? "#e8ff00" : "#111",
        }}
      >
        Equal Split
      </button>
      <button
        onClick={() => onChange("custom")}
        className="flex-1 py-2 rounded text-sm font-bold"
        style={{
          background: mode === "custom" ? "#111" : "#f0f0f0",
          color: mode === "custom" ? "#e8ff00" : "#111",
        }}
      >
        Custom Split
      </button>
    </div>
  );
};

export default SplitToggle;