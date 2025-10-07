"use client";

import useAppState from "lib/hooks/use-app-state.ts";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const AuthProtectRoute = ({
  children
}: {
  children: ReactNode;
}) => {
  // const { userLogedIn } = useAppState();
  const userLogedIn = true;
  if (!userLogedIn) return redirect("/sign-in");

  return children;
};

export default AuthProtectRoute;
