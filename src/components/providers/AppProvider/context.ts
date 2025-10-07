"use client";

import { createContext } from "react";
import type { AppStateMethods } from "../../../types/appProvider.ts";

export const AppContext = createContext<AppStateMethods | null>(null);
