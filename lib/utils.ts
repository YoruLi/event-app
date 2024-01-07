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

export const formatDate = ({ date, format }: { date: Date | number | null; format?: string }) => {
  if (!date) return;

  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat("es", dateFormat).format(date);
};

export const convertFileToURL = (file: File) => {
  return URL.createObjectURL(file);
};
