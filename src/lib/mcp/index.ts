import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProductsTool from "./tools/list-products";
import submitEnquiryTool from "./tools/submit-enquiry";
import listEnquiriesTool from "./tools/list-enquiries";

// Vite inlines the stable ref; the published SUPABASE_URL may be a proxy.
const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "custom-design-replicator",
  title: "Custom Design Replicator",
  version: "0.1.0",
  instructions:
    "Tools for Vikas Engineering Works. Use list_products to see the product range, submit_enquiry to send a quote request, and list_enquiries to review received enquiries (sign-in required).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProductsTool, submitEnquiryTool, listEnquiriesTool],
});
