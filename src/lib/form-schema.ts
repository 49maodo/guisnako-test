import * as z from "zod";

export interface ActionResponse<T> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}

export const RegisterSchema = z.object({
  categorie: z.string().min(1, "Please select an item"),
  fullname: z.string({ error: "This field is required" }),
  acronyme: z.string({ error: "This field is required" }).optional(),
  email: z.email({ error: "Please enter a valid email" }),
  tel: z.coerce.number({ error: "Please enter a valid phone number" }),
  telfixe: z.coerce
    .number({ error: "Please enter a valid phone number" })
    .optional(),
  adresse: z.string({ error: "This field is required" }).optional(),
  website: z.url({ error: "Please enter a valid url" }).optional(),
  logo: z
    .union([
      z.file().mime(["image/png", "image/jpeg", "image/gif"]).max(5242880),
      z
        .array(
          z.file().mime(["image/png", "image/jpeg", "image/gif"]).max(5242880),
        )
        .nonempty({ message: "Please select a file" }),
      z.string().min(1, "Please select a file"),
      z.instanceof(FileList),
    ])
    .optional(),
  description: z.string({ error: "This field is required" }).optional(),
  password: z.string({ error: "This field is required" }),
  confirmpassword: z.string({ error: "This field is required" }),
});
