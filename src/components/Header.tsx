import { useBill } from "../context/BillContext";

const Header = () => {
  const { state } = useBill();
  const totalBills = state.bills.length;

  return (
    <header
      className="w-full px-6 py-4 mb-8"
      style={{ background: "#111", borderBottom: "3px solid #e8ff00" }}
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: "1.5rem" }}>🧾</span>
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: "1.3rem",
              color: "#e8ff00",
            }}
          >
            SplitMate
          </span>
        </div>

        <div className="flex items-center gap-3">
          {totalBills > 0 && (
            <span
              className="text-xs px-2 py-1 rounded-full font-bold"
              style={{ background: "#e8ff00", color: "#111" }}
            >
              {totalBills} {totalBills === 1 ? "bill" : "bills"}
            </span>
          )}
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#666",
            }}
          >
            split bills easily
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;