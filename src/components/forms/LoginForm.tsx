"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Check } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export interface ActionResponse<T> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
const formSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  password: z.string({ error: "This field is required" }),
});


type Schema = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    try {
      // TODO: implement form submission
      console.log(data);
      form.reset();
      toast.success("Form submitted successfully!", {
        icon: <Check />,
      })
    } catch (error) {
      // TODO: handle error
      console.error(error);
      toast.error("An error occurred while submitting the form");
    }
  });

  
  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border max-w-3xl mx-auto"
    >
      <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full"
            >
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                {...field}
                id="email"
                type="text"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Enter votre mail"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full"
            >
              <FieldLabel htmlFor="password">Mot de passe *</FieldLabel>
              <Input
                {...field}
                id="password"
                type="text"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Enter votre mot de passe"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/* <div className="flex justify-end items-center w-full"> */}
        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      {/* </div> */}
    </form>
  );
}
