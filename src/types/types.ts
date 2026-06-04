export type Person = {
  id: string;
  name: string;
  amount: number;
  paid: boolean;
};

export type Bill = {
  id: string;
  title: string;
  total: number;
  people: Person[];
  createdAt: string;
};

export type SplitMode = "equal" | "custom";

export type AppState = {
  bills: Bill[];
  activeBillId: string | null;
};