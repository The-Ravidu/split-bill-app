import { render, screen, fireEvent } from "@testing-library/react";
import { BillProvider } from "../context/BillContext";
import BillForm from "./BillForm";

const renderWithProvider = (component: React.ReactElement) => {
  return render(<BillProvider>{component}</BillProvider>);
};

describe("BillForm", () => {
  it("should render title and amount inputs", () => {
    renderWithProvider(<BillForm />);
    expect(screen.getByPlaceholderText("e.g. Dinner at Zaza")).toBeTruthy();
    expect(screen.getByPlaceholderText("e.g. 84.50")).toBeTruthy();
  });

  it("should show error if submitted empty", () => {
    renderWithProvider(<BillForm />);
    fireEvent.click(screen.getByText("Create Bill"));
    expect(screen.getByText("Please enter a bill title.")).toBeTruthy();
  });

  it("should show error if amount is missing", () => {
    renderWithProvider(<BillForm />);
    fireEvent.change(screen.getByPlaceholderText("e.g. Dinner at Zaza"), {
      target: { value: "Lunch" },
    });
    fireEvent.click(screen.getByText("Create Bill"));
    expect(screen.getByText("Please enter a valid amount.")).toBeTruthy();
  });

  it("should clear inputs after successful submit", () => {
    renderWithProvider(<BillForm />);
    fireEvent.change(screen.getByPlaceholderText("e.g. Dinner at Zaza"), {
      target: { value: "Dinner" },
    });
    fireEvent.change(screen.getByPlaceholderText("e.g. 84.50"), {
      target: { value: "60" },
    });
    fireEvent.click(screen.getByText("Create Bill"));
    expect(
      (screen.getByPlaceholderText("e.g. Dinner at Zaza") as HTMLInputElement).value
    ).toBe("");
  });
});