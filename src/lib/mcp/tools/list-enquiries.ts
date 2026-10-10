import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_enquiries",
  title: "List enquiries",
  description: "List recent customer enquiries received by Vikas Engineering Works (signed-in users only).",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("Maximum number of enquiries to return"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("enquiries")
      .select("id, name, company, phone, email, product, location, quantity, message, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    const enquiries = (data ?? []).map((e) => ({
      id: e.id,
      name: e.name,
      company: e.company,
      phone: e.phone,
      email: e.email,
      product: e.product,
      location: e.location,
      quantity: e.quantity,
      message: e.message,
      created_at: e.created_at,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(enquiries) }],
      structuredContent: { enquiries },
    };
  },
});
