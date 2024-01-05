"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Dropwdown from "./dropdown";
import { createEvent } from "@/lib/actions/event.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface EventFormProps {
  userId: string;
  type: "Create" | "Update";
}
export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  start: new Date(),
  end: new Date(),
  categoryId: [],
  price: "",
  url: "",
};
export default function EventForm({ userId, type }: EventFormProps) {
  const [description, setDescription] = React.useState("");

  const router = useRouter();
  const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(400, "Description must be less than 400 characters"),
    categoryId: z.array(z.string()).optional(),
    price: z.string().optional(),
    start: z.date(),
    end: z.date(),
    imageUrl: z.string(),
    url: z.string(),
  });
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const resizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  React.useEffect(() => {
    if (textAreaRef.current) {
      resizeTextarea(textAreaRef.current);
    }
  }, [description]);

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    //  let uploadedImageUrl = values.imageUrl;
    //  if (files.length > 0) {
    //    const uploadedImages = await startUpload(files);
    //    if (!uploadedImages) {
    //      return;
    //    }
    //    uploadedImageUrl = uploadedImages[0].url;
    //  }
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          data: { ...values },
          categoryId: values.categoryId,
          organizerId: userId,
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    //  if (type === "Update") {
    //    if (!eventId) {
    //      router.back();
    //      return;
    //    }
    //    try {
    //      const updatedEvent = await updateEvent({
    //        userId,
    //        event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
    //        path: `/events/${eventId}`,
    //      });
    //      if (updatedEvent) {
    //        form.reset();
    //        router.push(`/events/${updatedEvent._id}`);
    //      }
    //    } catch (error) {
    //      console.log(error);
    //    }
    //  }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Event title..." {...field} className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropwdown onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    tabIndex={0}
                    maxLength={2000}
                    contentEditable="true"
                    aria-multiline="true"
                    aria-label="post text"
                    aria-autocomplete="list"
                    spellCheck="true"
                    placeholder="Event description..."
                    {...field}
                    ref={textAreaRef}
                    onChange={(evt) => {
                      setDescription(evt.target.value);
                      field.onChange(evt.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className=" w-full bg-blue-600 hover:bg-blue-800"
          >
            {form.formState.isSubmitting ? "Submitting..." : `Create Event `}
          </Button>
        </form>
      </Form>
    </>
  );
}
