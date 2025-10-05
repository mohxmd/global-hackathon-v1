"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { fileToBase64 } from "@/lib/utils/string";
import { X } from "lucide-react";
import { EchoFormValues, echoInsertSchema } from "@/db/schema/echo.sql";
import { createEcho } from "../../_actions/echo";

export function EchoCreateSheet({
  triggerClassName,
  children,
}: {
  triggerClassName?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<EchoFormValues>({
    resolver: zodResolver(echoInsertSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
      hashtags: [],
    },
  });

  // Extract hashtags from input text
  const extractHashtags = useCallback((value: string) => {
    const matches = value.match(/#[\p{L}\p{N}_-]+/gu) || [];
    return Array.from(
      new Set(matches.map((t) => t.replace(/^#/, "").toLowerCase()))
    );
  }, []);

  const handleHashtagsChange = (value: string) => {
    const hashtags = extractHashtags(value);
    form.setValue("hashtags", hashtags, { shouldValidate: true });
  };

  const onFileChange = (file?: File) => {
    if (!file) {
      setPreviewUrl(null);
      form.setValue("image", undefined, { shouldDirty: true });
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    form.setValue("image", file, { shouldDirty: true });
  };

  const onSubmit = async (values: EchoFormValues) => {
    startTransition(async () => {
      try {
        let imageData: string | undefined;
        if (values.image instanceof File) {
          imageData = await fileToBase64(values.image);
        }

        const result = await createEcho({
          ...values,
          image: imageData,
        });

        if (result.success) {
          toast.success("Echo created", {
            description: "Your memory has been saved to this Haven.",
          });
          form.reset();
          setPreviewUrl(null);
          setOpen(false);
        } else {
          toast.error("Failed to create echo", {
            description: result.error || "Please try again.",
          });
        }
      } catch (error) {
        console.error("Error creating echo:", error);
        toast.error("Something went wrong", {
          description: "Please try again.",
        });
      }
    });
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto p-4"
      >
        <SheetHeader className="p-0 gap-0">
          <SheetTitle>Create your Echo</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="A name for your memory..."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What do you remember?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write what you remember..."
                        className="min-h-[120px] resize-y"
                        {...field}
                        value={field.value || ""}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Hashtags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="#friends  #sunset  #travel"
                    onChange={(e) => handleHashtagsChange(e.target.value)}
                    disabled={isPending}
                  />
                </FormControl>
                {form.watch("hashtags")?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.watch("hashtags")!.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-2">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </FormItem>

              <FormItem>
                <FormLabel>Optional photo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      onFileChange(e.target.files?.[0] || undefined)
                    }
                    disabled={isPending}
                  />
                </FormControl>
                {previewUrl && (
                  <div className="mt-3 relative">
                    <img
                      src={previewUrl}
                      alt="Selected preview"
                      className="h-28 w-full max-w-[220px] rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => onFileChange(undefined)}
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </FormItem>

              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Echo"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
