import { generateId, formatCurrency, calculateEqualSplit } from "./helpers";

describe("generateId", () => {
  it("should return a non-empty string", () => {
    expect(typeof generateId()).toBe("string");
    expect(generateId().length).toBeGreaterThan(0);
  });

  it("should generate unique ids", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});

describe("formatCurrency", () => {
  it("should format a number with euro sign and 2 decimals", () => {
    expect(formatCurrency(10)).toBe("€10.00");
    expect(formatCurrency(84.5)).toBe("€84.50");
    expect(formatCurrency(0)).toBe("€0.00");
  });
});

describe("calculateEqualSplit", () => {
  it("should split equally among people", () => {
    expect(calculateEqualSplit(90, 3)).toBe(30);
    expect(calculateEqualSplit(100, 4)).toBe(25);
  });

  it("should return 0 if no people", () => {
    expect(calculateEqualSplit(90, 0)).toBe(0);
  });

  it("should handle uneven splits", () => {
    expect(calculateEqualSplit(10, 3)).toBe(3.33);
  });
});