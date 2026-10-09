import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{6,20}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255).optional().or(z.literal("")),
  product: z.string().trim().min(1, "Please select a product or service").max(100),
  location: z.string().trim().min(1, "Please enter the project location").max(150),
  quantity: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please describe your requirement").max(2000),
});

export type Enquiry = z.infer<typeof enquirySchema>;
