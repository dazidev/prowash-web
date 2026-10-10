"use server";

import {
  AdResponse,
  AdResponseArray,
  AdvertisingForm,
  ApiBooleanResponse,
  ErrorApi,
  getAxiosError,
  UrlUpImageResponse,
} from "@/infrastructure";
import { serverApi } from "@/infrastructure/lib/api/server-api";
import { API } from "@/interfaces";
import { revalidateTag } from "next/cache";
import { updateTag } from "next/cache";
import { validateAdvertisingImage } from "@/infrastructure/advertising/validateAdvertisingImage";
import { parseVimeoVideo } from "@/infrastructure/advertising/parseVimeoVideo";

type ImageKey = `image${1 | 2 | 3 | 4 | 5}`;

async function uploadImage(
  id: string,
  image: File,
  uploadedKeys: string[],
): Promise<string | ErrorApi> {
  try {
    const { data: response } = await serverApi.post<UrlUpImageResponse>(
      `/advertising/${id}/upload/image`,
      {
        mime: image.type,
        ext: image.name.split(".").pop()?.toLowerCase(),
        size: image.size,
      },
    );

    if (!response.success || !response.data) {
      return (
        response.error ?? {
          code: "ERROR_UPLOAD_IMAGE",
          message: "Unable to generate the image upload URL.",
        }
      );
    }

    uploadedKeys.push(response.data.key);

    const putRes = await fetch(response.data.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": image.type },
      body: image,
      cache: "no-store",
    });

    if (!putRes.ok) {
      return {
        code: "R2_UPLOAD_FAILED",
        message: "Unable to upload the image.",
      };
    }

    return response.data.key;
  } catch (error: unknown) {
    return {
      code: "ERROR_UPLOAD_IMAGE",
      message: getAxiosError(error) ?? "Unable to upload the image.",
    };
  }
}

async function attachImage(
  id: string,
  key: string,
  position = 1,
): Promise<boolean | ErrorApi> {
  try {
    const { data: response } = await serverApi.post<ApiBooleanResponse>(
      `/advertising/${id}/image/attach`,
      { key },
      { params: { image: position } },
    );

    if (!response.success) {
      return {
        code: "ERROR_ATTACH_IMAGE",
        message: "Unable to attach the image.",
      };
    }

    return true;
  } catch (error: unknown) {
    return {
      code: "ERROR_ATTACH_IMAGE",
      message: getAxiosError(error) ?? "Unable to attach the image.",
    };
  }
}

export async function createAdvertising(
  advData: AdvertisingForm,
): Promise<boolean | ErrorApi> {
  const files: { position: number; file: File }[] = [];

  if (advData.type === "VIDEO" && !parseVimeoVideo(advData.video ?? "")) {
    return {
      code: "INVALID_VIMEO",
      message: "Enter a valid Vimeo ID or URL.",
    };
  }

  if (advData.type === "IMAGE" && !advData.image1) {
    return {
      code: "INVALID_IMAGE",
      message: "Select an image.",
    };
  }

  if (
    advData.type === "IMAGE_CAROUSEL" &&
    (!advData.image1 || !advData.image2)
  ) {
    return {
      code: "INVALID_IMAGE",
      message: "Select at least two images.",
    };
  }

  if (advData.type === "IMAGE" || advData.type === "IMAGE_CAROUSEL") {
    const limit = advData.type === "IMAGE" ? 1 : 5;

    for (let position = 1; position <= limit; position++) {
      const file = advData[`image${position}` as ImageKey];
      if (!file) continue;

      const message = validateAdvertisingImage(file);
      if (message) return { code: "INVALID_IMAGE", message };

      files.push({ position, file });
    }
  }

  let response: AdResponse;

  try {
    const { type, order, text, video } = advData;

    const result = await serverApi.post<AdResponse>("/advertising/create", {
      type,
      order,
      text,
      ...(type === "VIDEO" ? { video } : {}),
    });

    response = result.data;
  } catch (error: unknown) {
    return {
      code: "ERROR_CREATE_ADVERTISING",
      message: getAxiosError(error) ?? "Unable to create the advertising.",
    };
  }

  if (!response.success || !response.data) {
    return (
      response.error ?? {
        code: "ERROR_CREATE_ADVERTISING",
        message: "Unable to create the advertising.",
      }
    );
  }

  const id = response.data.id;
  const uploadedKeys: string[] = [];

  const rollback = async (error: ErrorApi): Promise<ErrorApi> => {
    const cleanup = await deleteAdvertising(id, uploadedKeys);

    if (cleanup === true) return error;

    return {
      code: "ERROR_CLEANUP_ADVERTISING",
      message: `${error.message} Cleanup failed: ${
        typeof cleanup === "object" ? cleanup.message : "Unknown error"
      }. Delete the incomplete advertising before retrying.`,
    };
  };

  for (const { position, file } of files) {
    const key = await uploadImage(id, file, uploadedKeys);

    if (typeof key !== "string") {
      return rollback(key);
    }

    const attach = await attachImage(id, key, position);

    if (attach !== true) {
      return rollback(
        typeof attach === "object"
          ? attach
          : {
              code: "ERROR_ATTACH_IMAGE",
              message: "Unable to attach the image.",
            },
      );
    }
  }

  updateTag("advertising");
  return true;
}

export async function getAdvertising() {
  try {
    const arrayAdv = await fetch(`${API}/api/advertising`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { tags: ["advertising"] },
    });
    const response: AdResponseArray = await arrayAdv.json();

    if (!response.success) return response.error;

    return response.data;
  } catch {
    return {
      code: "ERROR_GET_ADVERTISING",
      message: "There was an unknown problem getting the advertisings.",
    } as ErrorApi;
  }
}

export async function deleteAdvertising(
  id: string,
  keys: string[] = [],
): Promise<boolean | ErrorApi> {
  try {
    const { data: response } = await serverApi.delete<ApiBooleanResponse>(
      `/advertising/${id}`,
      { data: { keys } },
    );

    if (!response.success) {
      return {
        code: "ERROR_DELETE_ADVERTISING",
        message: "Unable to delete the advertising.",
      };
    }

    updateTag("advertising");
    return true;
  } catch (error: unknown) {
    return {
      code: "ERROR_DELETE_ADVERTISING",
      message: getAxiosError(error) ?? "Unable to delete the advertising.",
    };
  }
}
