"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Dropwdown from "./dropdown";
import { createEvent, updateEventById } from "@/lib/actions/event.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FileUploader } from "./uploader";
import { Svg } from "./ui/svg";
import { svgs } from "@/data/svgs";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { IEventSchema } from "@/lib/database/models/event.model";

interface EventFormProps {
  userId: string;
  type: "Create" | "Update";
  eventDefaultValuesProp?: IEventSchema;
  eventId?: string;
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
export default function EventForm({
  userId,
  type,
  eventDefaultValuesProp,
  eventId,
}: EventFormProps) {
  const [description, setDescription] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);

  const router = useRouter();
  const eventFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(400, "Description must be less than 400 characters"),
    categoryId: z.array(z.string()),
    location: z.string(),
    price: z.string().optional(),
    isFree: z.boolean(),
    start: z.coerce
      .date()
      .refine((data) => data > new Date(), { message: "Start date must be in the future" }),
    end: z.coerce
      .date()
      .refine((data) => data > new Date(), { message: "End date must be in the future" }),
    imageUrl: z.string(),
    url: z.string(),
  });
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues:
      type === "Update"
        ? {
            ...eventDefaultValuesProp,
            start: new Date(eventDefaultValuesProp?.start!),
            end: new Date(eventDefaultValuesProp?.end!),
          }
        : eventDefaultValues,
  });

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const resizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const { startUpload } = useUploadThing("imageUploader");
  React.useEffect(() => {
    if (textAreaRef.current) {
      resizeTextarea(textAreaRef.current);
    }
  }, [description]);

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          data: { ...values, imageUrl: uploadedImageUrl },
          categoryId: values.categoryId,
          userId,
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      try {
        if (!eventId) {
          return;
        }
        const update = await updateEventById({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/profile/events`,
        });
        if (update) {
          form.reset();
          router.push(`/profile/events`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 max-w-xl mx-auto "
        >
          <FormField
            name="name"
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

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUploader
                    imageUrl={field.value}
                    onFieldChange={field.onChange}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center *:text-muted-foreground  ">
                    <Input
                      placeholder={"Event location"}
                      className="input-field relative px-8"
                      {...field}
                    />
                    <Svg
                      path={svgs.ubication.path}
                      viewBox={svgs.ubication.viewBox}
                      height={18}
                      width={18}
                      className="absolute ml-2 pointer-events-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col lg:flex-row w-full gap-4 *:text-muted-foreground ">
            <FormField
              name="start"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormControl>
                    <div>
                      <Label htmlFor="start" className="text-xs">
                        Start Date
                      </Label>
                      <div className="relative flex items-center  ">
                        <Input
                          id="start"
                          type="datetime-local"
                          onChange={(evt) => {
                            field.onChange(new Date(evt.currentTarget.value));
                          }}
                          className="input-field relative px-8"
                          placeholder="Enter the starting date"
                        />

                        <Svg
                          path={svgs.ubication.path}
                          viewBox={svgs.ubication.viewBox}
                          height={18}
                          width={18}
                          className="absolute ml-2 pointer-events-none"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="end"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div>
                      <Label htmlFor="end" className="text-xs">
                        End Date
                      </Label>
                      <div className="relative flex items-center  ">
                        <Input
                          id="end"
                          type="datetime-local"
                          onChange={(evt) => {
                            field.onChange(new Date(evt.currentTarget.value));
                          }}
                          className="input-field relative px-8"
                          placeholder="Enter the Ending date"
                        />

                        <Svg
                          path={svgs.ubication.path}
                          viewBox={svgs.ubication.viewBox}
                          height={18}
                          width={18}
                          className="absolute ml-2 pointer-events-none fill-gray-400"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center overflow-hidden relative">
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      disabled={form.watch("isFree")}
                      className="input-field relative"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem className="absolute ml-2 right-0">
                          <FormControl>
                            <div className="flex items-center relative ">
                              <label
                                htmlFor="isFree"
                                className="  whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground text-sm"
                              >
                                Free
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500 bg-muted"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="absolute bottom-0 pointer-events-none -left-20 my-auto z-0" />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="relative flex items-center  ">
                      <Input className="input-field relative px-8" placeholder="URL" {...field} />

                      <Svg
                        path={svgs.link.path}
                        viewBox={svgs.link.viewBox}
                        height={18}
                        width={18}
                        className="absolute ml-2 pointer-events-none fill-gray-400"
                      />
                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className=" w-full bg-blue-600 hover:bg-blue-800 text-card-foreground"
          >
            {form.formState.isSubmitting ? "Submitting..." : `Create Event `}
          </Button>
        </form>
      </Form>
    </>
  );
}
