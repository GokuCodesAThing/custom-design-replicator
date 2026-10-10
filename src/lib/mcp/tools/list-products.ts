import { defineTool } from "@lovable.dev/mcp-js";
import { PRODUCTS, SITE } from "@/lib/site-config";

export default defineTool({
  name: "list_products",
  title: "List products",
  description: "List the electrical panel products and services offered by Vikas Engineering Works.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PRODUCTS) }],
    structuredContent: {
      company: SITE.name,
      products: PRODUCTS.map((name) => ({ name })),
    },
  }),
});
