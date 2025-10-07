"use client";

import { useCallback, useReducer } from "react";
import {
  type AppStateActionProps,
  AppStateActionTypes,
  type AppStateMethods,
  type AppStateProps
} from "../../types/appProvider.ts";

export default function useAppState(): AppStateMethods {
  const initialAppState: AppStateProps = {
    userLogedIn: false
  };

  const appStateReducer = (
    appState: AppStateProps,
    appStateAction: AppStateActionProps
  ): AppStateProps => {
    switch (appStateAction.type) {
      case AppStateActionTypes.login:
        return {
          userLogedIn: true
        };
      case AppStateActionTypes.logout:
        return {
          userLogedIn: false
        };
      default:
        return appState;
    }
  };

  const [appState, appStateDispatch] = useReducer(
    appStateReducer,
    initialAppState
  );

  const login = useCallback(
    () => appStateDispatch({ type: AppStateActionTypes.login }),
    []
  );

  const logout = useCallback(
    () => appStateDispatch({ type: AppStateActionTypes.logout }),
    []
  );

  return {
    userLogedIn: appState.userLogedIn,
    login,
    logout
  };
}
