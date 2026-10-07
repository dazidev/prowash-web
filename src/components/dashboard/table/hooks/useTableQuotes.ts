import { useState } from "react";

export const useTableQuotes = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  return {
    open,
    setOpen,
    handleOpen,
  };
};
