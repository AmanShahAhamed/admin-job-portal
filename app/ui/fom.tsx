import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField as RHFFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

type FieldConfig<T> = {
  label: string;
  name: Extract<keyof T, string>;
  defaultValue?: string;
  validation: z.ZodTypeAny;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "ref"
>;

type CustomFormProps<T extends Record<string, any>> = {
  onSubmit: SubmitHandler<Record<string, any>>;
  formFields: FieldConfig<T>[];
  submitButtonLabel: string;
  extraButtons?: React.ReactNode;
};

export const CustomForm = <T extends Record<string, any>>({
  onSubmit,
  formFields,
  submitButtonLabel,
  extraButtons,
}: CustomFormProps<T>) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};
  const defaultValues: Record<string, unknown> = {};

  formFields.forEach((field) => {
    schemaShape[field.name as string] = field.validation;
  });

  formFields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      defaultValues[field.name as string] = field.defaultValue;
    }
  });

  const formSchema = z.object(schemaShape);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((config) => (
          <RHFFormField
            key={String(config.name)}
            control={form.control}
            name={config.name as string}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{config.label}</FormLabel>
                <FormControl>
                  <Input
                    {...config}
                    value={String(field.value)}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex gap-2">
          <Button type="submit" className="cursor-pointer">
            {submitButtonLabel}
          </Button>
          {extraButtons}
        </div>
      </form>
    </Form>
  );
};
