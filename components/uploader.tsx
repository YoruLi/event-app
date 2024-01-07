/* eslint-disable @next/next/no-img-element */
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
"use client";
import { useDropzone } from "@uploadthing/react/hooks";
import React, { Dispatch, SetStateAction } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import {} from "@/lib/uploadthing";
import { FileWithPath } from "@uploadthing/react";
import { convertFileToURL } from "@/lib/utils";

interface FileUploaderProps {
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  onFieldChange: (url: string) => void;
}
export function FileUploader({ imageUrl, setFiles, onFieldChange }: FileUploaderProps) {
  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-muted -3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            width={250}
            height={250}
            alt="Image"
            className="object-cover w-full block object-center"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full flex-col py-5 text-grey-500">
          <span className=" text-9xl  text-transparent italic font-paytone bg-transparent  bg-gradient-to-r  from-violet-700/50 to-blue-700/50 bg-blend-multiply bg-clip-text">
            DE
          </span>
          <legend>Drag photo here</legend>
          <p className="mb-4 text-sm font-bold text-muted-foreground">SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  );
}
