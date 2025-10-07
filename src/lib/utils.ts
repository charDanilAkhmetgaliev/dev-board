import { type ClassValue, clsx } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genId(size: number = 4): string {
  return nanoid(size);
}

export function getInitials(name: string): string {
  const nameArray = name.trim().split(" ");

  return `${nameArray[0][0] + nameArray[1][0]}`.toUpperCase();
}
