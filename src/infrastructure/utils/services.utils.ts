import { PackageRangeItem, PServiceItem } from "../http/interface";

type Service = {
  name: string;
};

type Range = {
  description: string;
};

export const isService = (value: unknown): value is Service => {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof (value as { name: unknown }).name === "string"
  );
};

export const isRange = (value: unknown): value is Range => {
  return (
    typeof value === "object" &&
    value !== null &&
    "description" in value &&
    typeof (value as { description: unknown }).description === "string"
  );
};

export const getName = (item: PServiceItem | PackageRangeItem) => {
  if (isService(item)) {
    return item.name;
  } else if (isRange(item)) {
    return item.description;
  }
};
