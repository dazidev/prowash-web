import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutsideClick: () => void,
  ignoreRefs: React.RefObject<HTMLElement | null>[] = []
) {
  useEffect(() => {
    function handler(event: MouseEvent) {
      const target = event.target as Node;

      if (!ref.current) return;
      if (ref.current.contains(target)) return;

      for (const r of ignoreRefs) {
        if (r.current && r.current.contains(target)) return;
      }

      onOutsideClick();
    }

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onOutsideClick, ignoreRefs]);
}
