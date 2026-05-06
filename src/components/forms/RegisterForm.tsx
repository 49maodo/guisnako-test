"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";
import { RegisterSchema } from "@/lib/form-schema";
import { Textarea } from "../ui/textarea";

type Schema = z.input<typeof RegisterSchema>;

export function RegisterForm() {
    const form = useForm<Schema>({
        resolver: zodResolver(RegisterSchema),
    });
    const {
        formState: { isSubmitting },
    } = form;

    const handleSubmit = form.handleSubmit(async (data: Schema) => {
        try {
            // TODO: implement form submission
            console.log(data);
            form.reset();
        } catch (error) {
            console.error(error);
            // TODO: handle error
        }
    });

    return (
        <form
            onSubmit={handleSubmit}
            className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border max-w-3xl mx-auto"
        >
            <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6 mx-auto">
                <Controller
                    name="categorie"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        const options = [
                            { value: "prestation", label: "Prestation des services " },
                            { value: "boutique/magasin", label: "Boutique/Magasin" },
                            { value: "gouvernement", label: "Gouvernement du Sénégal" },
                        ];
                        return (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 md:col-span-3"
                            >
                                <FieldLabel htmlFor="categorie">Categorie *</FieldLabel>

                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choisir" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        );
                    }}
                />

                <Controller
                    name="fullname"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 md:col-span-3"
                        >
                            <FieldLabel htmlFor="fullname">Nom complet *</FieldLabel>
                            <Input
                                {...field}
                                id="fullname"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Entrer votre nom complet"
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="acronyme"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 md:col-span-3"
                        >
                            <FieldLabel htmlFor="acronyme">Acronyme </FieldLabel>
                            <Input
                                {...field}
                                id="acronyme"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Entrer votre acronyme"
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 md:col-span-3"
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
                                placeholder="Entrer votre mail"
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="tel"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 md:col-span-3"
                        >
                            <FieldLabel htmlFor="tel">Numéro Mobile *</FieldLabel>
                            <Input
                                {...field}
                                value={field.value as string}
                                id="tel"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Numéro mobile ..."
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="telfixe"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 md:col-span-3"
                        >
                            <FieldLabel htmlFor="telfixe">Numéro Fixe </FieldLabel>
                            <Input
                                {...field}
                                value={field.value as string}
                                id="telfixe"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Numéro Fixe ..."
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="adresse"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 md:col-span-3"
                        >
                            <FieldLabel htmlFor="adresse">Adresse </FieldLabel>
                            <Input
                                {...field}
                                id="adresse"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Adresse ..."
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="website"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 md:col-span-3"
                        >
                            <FieldLabel htmlFor="website">Site Web </FieldLabel>
                            <Input
                                {...field}
                                id="website"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Site Web ..."
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            
                <Controller
                    name="logo"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="w-full max-w-xl md:min-w-xl ">
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 w-full"
                            >
                                <FieldLabel htmlFor="logo">Logo de l'action </FieldLabel>
                                <FieldDescription>Select votre logo</FieldDescription>
                                <FileUpload
                                    {...field}
                                    setValue={(_, value, options) =>
                                        form.setValue("logo", value, options)
                                    }
                                    name="logo"
                                    placeholder="PNG, JPEG or Gif, (max. 5MB)"
                                    accept={`image/png, image/jpeg, image/gif`}
                                    maxFiles={1}
                                    maxSize={5242880}
                                />
                            </Field>
                            {Array.isArray(fieldState.error) ? (
                                fieldState.error?.map((error, i) => (
                                    <p
                                        key={i}
                                        role="alert"
                                        data-slot="field-error"
                                        className="text-destructive text-sm"
                                    >
                                        {error.message}
                                    </p>
                                ))
                            ) : (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="description">Description </FieldLabel>
                            <Textarea
                                {...field}
                                aria-invalid={fieldState.invalid}
                                id="description"
                                placeholder="Description ..."
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
                            className="gap-1 md:col-span-3"
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
                                placeholder="Mot de passe ..."
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="confirmpassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 md:col-span-3"
                        >
                            <FieldLabel htmlFor="confirmpassword">
                                Confirmer le mot de passe *
                            </FieldLabel>
                            <Input
                                {...field}
                                id="confirmpassword"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Confirmer le mot de passe ..."
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
            <div className="flex justify-end items-center w-full">
                <Button disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}
