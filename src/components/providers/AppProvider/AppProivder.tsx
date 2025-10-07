"use client";

import useAppState from "lib/hooks/use-app-state.ts";
import type { ReactNode } from "react";
import { AppContext } from "./context";

const AppProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const appStateMethods = useAppState();

  return (
    <AppContext.Provider value={appStateMethods}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
