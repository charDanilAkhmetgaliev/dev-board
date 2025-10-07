"use client";

import { useCallback } from "react";

function useClientUrlParams() {
  const updateUrlParam = useCallback(
    (key: string, value: string | null, replace = false) => {
      const params = new URLSearchParams(window.location.search);

      if (params) {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;

        if (replace) {
          window.history.replaceState(null, "", newUrl);
        } else {
          window.history.pushState(null, "", newUrl);
        }
      }
    },
    []
  );

  return { updateUrlParam };
}

export default useClientUrlParams;
