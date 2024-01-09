import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const executeSafely = async <T>(
  callback: (...args: any) => Promise<T>,
  ...args: any[]
): Promise<T> => {
  try {
    return await callback(...args);
  } catch (error) {
    throw error;
  }
};

export const formatDate = (date: Date) => {
  if (!date) return;

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric", // numeric minute (e.g., '30')
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return {
    formattedDateTime: new Intl.DateTimeFormat("en-US", dateTimeOptions).format(new Date(date)),
    formattedDate: new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(date)),
    formattedTime: new Intl.DateTimeFormat("en-US", timeOptions).format(new Date(date)),
  };
};

export const convertFileToURL = (file: File) => {
  return URL.createObjectURL(file);
};
