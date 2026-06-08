import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AppState, Bill, Person, SplitMode } from "../types/types";
import { generateId, calculateEqualSplit } from "../utils/helpers";

type BillContextType = {
  state: AppState;
  addBill: (title: string, total: number) => void;
  removeBill: (id: string) => void;
  setActiveBill: (id: string) => void;
  addPerson: (billId: string, name: string) => void;
  removePerson: (billId: string, personId: string) => void;
  togglePaid: (billId: string, personId: string) => void;
  setSplitMode: (billId: string, mode: SplitMode) => void;
  updateCustomAmount: (billId: string, personId: string, amount: number) => void;
};

const BillContext = createContext<BillContextType | null>(null);

const loadFromStorage = (): AppState => {
  try {
    const saved = localStorage.getItem("splitmate-bills");
    if (saved) return JSON.parse(saved) as AppState;
  } catch {
    // if parsing fails just start fresh
  }
  return { bills: [], activeBillId: null };
};

const saveToStorage = (state: AppState) => {
  try {
    localStorage.setItem("splitmate-bills", JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
};

export const BillProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(loadFromStorage);

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const addBill = (title: string, total: number) => {
    const newBill: Bill = {
      id: generateId(),
      title,
      total,
      people: [],
      createdAt: new Date().toLocaleDateString(),
    };
    setState((prev) => ({
      ...prev,
      bills: [...prev.bills, newBill],
      activeBillId: newBill.id,
    }));
  };

  const removeBill = (id: string) => {
    setState((prev) => ({
      ...prev,
      bills: prev.bills.filter((b) => b.id !== id),
      activeBillId: prev.activeBillId === id ? null : prev.activeBillId,
    }));
  };

  const setActiveBill = (id: string) => {
    setState((prev) => ({ ...prev, activeBillId: id }));
  };

  const addPerson = (billId: string, name: string) => {
    setState((prev) => {
      const updatedBills = prev.bills.map((bill) => {
        if (bill.id !== billId) return bill;
        const newPerson: Person = {
          id: generateId(),
          name,
          amount: 0,
          paid: false,
        };
        const updatedPeople = [...bill.people, newPerson];
        const splitAmount = calculateEqualSplit(bill.total, updatedPeople.length);
        return {
          ...bill,
          people: updatedPeople.map((p) => ({ ...p, amount: splitAmount })),
        };
      });
      return { ...prev, bills: updatedBills };
    });
  };

  const removePerson = (billId: string, personId: string) => {
    setState((prev) => {
      const updatedBills = prev.bills.map((bill) => {
        if (bill.id !== billId) return bill;
        const updatedPeople = bill.people.filter((p) => p.id !== personId);
        const splitAmount = calculateEqualSplit(bill.total, updatedPeople.length);
        return {
          ...bill,
          people: updatedPeople.map((p) => ({ ...p, amount: splitAmount })),
        };
      });
      return { ...prev, bills: updatedBills };
    });
  };

  const togglePaid = (billId: string, personId: string) => {
    setState((prev) => {
      const updatedBills = prev.bills.map((bill) => {
        if (bill.id !== billId) return bill;
        return {
          ...bill,
          people: bill.people.map((p) =>
            p.id === personId ? { ...p, paid: !p.paid } : p
          ),
        };
      });
      return { ...prev, bills: updatedBills };
    });
  };

  const setSplitMode = (billId: string, mode: SplitMode) => {
    if (mode === "equal") {
      setState((prev) => {
        const updatedBills = prev.bills.map((bill) => {
          if (bill.id !== billId) return bill;
          const splitAmount = calculateEqualSplit(bill.total, bill.people.length);
          return {
            ...bill,
            people: bill.people.map((p) => ({ ...p, amount: splitAmount })),
          };
        });
        return { ...prev, bills: updatedBills };
      });
    }
  };

  const updateCustomAmount = (billId: string, personId: string, amount: number) => {
    setState((prev) => {
      const updatedBills = prev.bills.map((bill) => {
        if (bill.id !== billId) return bill;
        return {
          ...bill,
          people: bill.people.map((p) =>
            p.id === personId ? { ...p, amount } : p
          ),
        };
      });
      return { ...prev, bills: updatedBills };
    });
  };

  return (
    <BillContext.Provider
      value={{
        state,
        addBill,
        removeBill,
        setActiveBill,
        addPerson,
        removePerson,
        togglePaid,
        setSplitMode,
        updateCustomAmount,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export const useBill = (): BillContextType => {
  const context = useContext(BillContext);
  if (!context) throw new Error("useBill must be used inside BillProvider");
  return context;
};