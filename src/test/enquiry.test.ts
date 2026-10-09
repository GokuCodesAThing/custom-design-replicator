import { describe, it, expect } from "vitest";
import { enquirySchema } from "@/lib/enquiry";

const valid = { name: "Ram", phone: "+91 98765 43210", product: "PCC Panel", location: "Aligarh", message: "Need a quote" };

describe("enquiry form rules", () => {
  it("accepts required fields only (company, email, quantity optional)", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });
  it("rejects missing phone number", () => {
    expect(enquirySchema.safeParse({ ...valid, phone: "" }).success).toBe(false);
  });
  it("rejects missing project location", () => {
    expect(enquirySchema.safeParse({ ...valid, location: "" }).success).toBe(false);
  });
});
