"use client";
import React from "react";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Dropwdown from "./dropdown";

type EventSchema = {
  title: string;
  description: string;
};
export default function EventForm() {
  const [description, setDescription] = React.useState("");
  const eventSchema = z.object({
    title: z.string(),
    description: z.string(),
  });
  const form = useForm<EventSchema>({
    defaultValues: {
      title: "",
      description: "",
    },
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

  return (
    <>
      <Form {...form}>
        <form action="" className="flex flex-col gap-5">
          <FormField
            name="title"
            control={form.control}
            render={({ field, fieldState, formState }) => <Input placeholder="Event title..." />}
          />
          <FormField
            name="title"
            control={form.control}
            render={({ field, fieldState, formState }) => <Dropwdown />}
          />
          <FormField
            name="title"
            control={form.control}
            render={({ field, fieldState, formState }) => (
              <Textarea
                onChange={(evt) => {
                  setDescription(evt.target.value);
                }}
                tabIndex={0}
                maxLength={2000}
                contentEditable="true"
                aria-multiline="true"
                aria-label="post text"
                aria-autocomplete="list"
                spellCheck="true"
                placeholder="Event description..."
                ref={textAreaRef}
              />
            )}
          />
        </form>
      </Form>
    </>
  );
}
