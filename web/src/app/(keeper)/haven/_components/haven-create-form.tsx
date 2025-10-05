"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { organizationInsertSchema } from "@/db/schema/auth.sql";
import { fileToBase64, toSlug } from "@/lib/utils/string";
import { createHaven } from "../_actions";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof organizationInsertSchema>;

export function HavenCreateForm() {
  const [isPending, startTransition] = useTransition();
  const [slugDirty, setSlugDirty] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(organizationInsertSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
    },
    mode: "onChange",
  });

  const name = form.watch("name");

  // Auto-generate slug from name
  useEffect(() => {
    if (!slugDirty) {
      form.setValue("slug", name ? toSlug(name) : "");
    }
  }, [name, slugDirty, form]);

  // Manage logo preview URL
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  async function onSubmit(values: FormValues) {
    startTransition(async () => {
      let logoData: string | undefined;
      if (values.logo instanceof File) {
        logoData = await fileToBase64(values.logo);
      }
      const result = await createHaven({ ...values, logo: logoData });
      if (result.success) {
        form.reset({ name: "", slug: "", logo: undefined });
        toast.success("Haven created", {
          description: `${values.name}${
            values.slug ? ` (${values.slug})` : ""
          } is ready.`,
        });
        router.push(`/archive`);
      } else {
        toast.error("Something went wrong", {
          description: "Please try again.",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          console.log("Form submit event triggered");
          form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors:", errors);
            toast.error("Validation failed", {
              description: "Please check the form for errors.",
            });
          })(e);
        }}
        className="space-y-6"
      >
        <div className="grid gap-5 md:grid-cols-[auto,1fr] md:gap-6">
          <div className="flex md:block items-center gap-4">
            <Avatar className="size-16 md:size-20">
              <AvatarImage
                src={logoPreview || undefined}
                alt={logoPreview ? "Haven logo preview" : "No logo selected"}
              />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Haven name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Family Memories"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormDescription>
                    Give your haven a memorable name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="family-memories"
                      {...field}
                      onChange={(e) => {
                        setSlugDirty(true);
                        field.onChange(e);
                      }}
                      autoComplete="off"
                      inputMode="url"
                    />
                  </FormControl>
                  <FormDescription>
                    Auto-generated from the name. You can edit it.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={() => (
                <FormItem>
                  <FormLabel>Logo (optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("logo", file, {
                              shouldValidate: true,
                            });
                            const url = URL.createObjectURL(file);
                            setLogoPreview((prev) => {
                              if (prev) URL.revokeObjectURL(prev);
                              return url;
                            });
                          } else {
                            form.setValue("logo", undefined, {
                              shouldValidate: true,
                            });
                            setLogoPreview((prev) => {
                              if (prev) URL.revokeObjectURL(prev);
                              return null;
                            });
                          }
                        }}
                      />
                      {logoPreview ? (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            form.setValue("logo", undefined, {
                              shouldValidate: true,
                            });
                            setLogoPreview((prev) => {
                              if (prev) URL.revokeObjectURL(prev);
                              return null;
                            });
                          }}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload an image to personalize your haven.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end"
          )}
        >
          <Link
            href="/archive"
            className="text-muted-foreground underline underline-offset-4 sm:mr-auto"
          >
            Skip for now
          </Link>
          <Button type="submit" disabled={isPending || !name.trim()}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
