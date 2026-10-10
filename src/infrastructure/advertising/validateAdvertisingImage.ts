export const validateAdvertisingImage = (file: File): string | null => {
  const extensions: Record<string, string[]> = {
    "image/jpeg": ["jpg", "jpeg"],
    "image/jpg": ["jpg", "jpeg"],
    "image/png": ["png"],
    "image/webp": ["webp"],
  };

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (!extensions[file.type]?.includes(ext)) {
    return "Select a JPG, PNG or WEBP image.";
  }

  if (file.size < 1 || file.size > 2 * 1024 * 1024) {
    return "The image must be between 1 byte and 2 MB.";
  }

  return null;
};
