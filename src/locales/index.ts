import { en } from "./en";

export const messages = { en };

export const defaultLocale = "en" as const;

export type SupportedLocale = keyof typeof messages;
