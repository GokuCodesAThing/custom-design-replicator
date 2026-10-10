import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { enquirySchema } from "@/lib/enquiry";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_enquiry",
  title: "Submit enquiry",
  description: "Submit a new product enquiry / quote request to Vikas Engineering Works.",
  inputSchema: {
    name: z.string().trim().min(1).describe("Contact person name"),
    company: z.string().trim().optional().describe("Company name"),
    phone: z.string().trim().min(1).describe("Phone number"),
    email: z.string().trim().email().optional().describe("Email address"),
    product: z.string().trim().min(1).describe("Product of interest, e.g. PCC Panel"),
    location: z.string().trim().min(1).describe("Project / delivery location"),
    quantity: z.string().trim().optional().describe("Required quantity"),
    message: z.string().trim().min(1).describe("Requirement details"),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const parsed = enquirySchema.safeParse(input);
    if (!parsed.success) {
      return {
        content: [{ type: "text", text: parsed.error.issues.map((i) => i.message).join("; ") }],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("enquiries").insert(parsed.data).select("id");
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: "Enquiry submitted successfully." }],
      structuredContent: { id: data?.[0]?.id ?? null },
    };
  },
});
