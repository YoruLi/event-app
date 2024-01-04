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
