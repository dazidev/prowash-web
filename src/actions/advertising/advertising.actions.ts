"use server";

import {
  AdResponse,
  AdResponseArray,
  AdvertisingForm,
  ApiBooleanResponse,
  ErrorApi,
  UrlUpImageResponse,
} from "@/infrastructure";
import { API } from "@/interfaces";
import { revalidateTag } from "next/cache";

type ImageKey = `image${1 | 2 | 3 | 4 | 5}`;

async function uploadImage(
  id: string,
  image: File,
): Promise<string | ErrorApi> {
  try {
    const dataImage = {
      id,
      mime: image.type,
      ext: image.name.split(".").pop(),
      size: image.size,
    };

    const responseUrl = await fetch(
      `${API}/api/advertising/${id}/upload/image`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataImage),
        cache: "no-store",
      },
    );

    const url: UrlUpImageResponse = await responseUrl.json();
    if (!url.success) return url.error!;

    const putRes = await fetch(url.data!.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": image.type },
      body: image,
      cache: "no-store",
    });
    if (!putRes.ok)
      return { code: "R2_UPLOAD_FAILED", message: "R2 is failing." };

    return url.data!.key;
  } catch {
    return {
      code: "ERROR_UPLOAD_IMAGE",
      message: "There was an unknown problem uploading the image.",
    };
  }
}

async function attachImage(
  id: string,
  key: string,
  position?: number,
): Promise<boolean | ErrorApi> {
  try {
    const url = new URL(`${API}/api/advertising/${id}/image/attach`);

    if (position) url.searchParams.set("image", position.toString());

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
      cache: "no-store",
    });

    const res: ApiBooleanResponse = await response.json();
    if (!res.success)
      return {
        code: "ERROR_ATTACH_IMAGE",
        message: "There was an unknown problem attaching the image.",
      };

    return true;
  } catch {
    return {
      code: "ERROR_ATTACH_IMAGE",
      message: "There was an unknown problem attaching the image.",
    };
  }
}

export async function createAdvertising(
  advData: AdvertisingForm,
): Promise<boolean | ErrorApi> {
  const adv = await fetch(`${API}/api/advertising/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(advData),
    cache: "no-store",
  });
  const response: AdResponse = await adv.json();

  //! todo: saber si respondio con un success = true

  if (advData.type === "IMAGE") {
    const { id } = response.data!;
    const image = advData.image1!;

    const key: string | ErrorApi = await uploadImage(id, image);

    if (!(typeof key === "string")) return key;

    const attach: boolean | ErrorApi = await attachImage(id, key);

    if (!(typeof attach === "boolean")) return attach;
  } else if (advData.type === "IMAGE_CAROUSEL") {
    const { id } = response.data!;
    for (let i = 1; i <= 5; i++) {
      const image = `image${i}` as ImageKey;
      const file = advData[image];
      if (file === null || file === undefined) continue;

      const key: string | ErrorApi = await uploadImage(id, file);
      if (!(typeof key === "string")) return key;

      const attach: boolean | ErrorApi = await attachImage(id, key, i);
      if (!(typeof attach === "boolean")) return attach;
    }
  }

  revalidateTag("advertising", "default");
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
): Promise<boolean | ErrorApi> {
  try {
    const deleteAdv = await fetch(`${API}/api/advertising/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const response: AdResponse = await deleteAdv.json();
    if (!response.success) return response.error!;

    revalidateTag("advertising", "default");
    return true;
  } catch {
    return {
      code: "ERROR_DELETE_ADVERTISING",
      message: "There was an unknown problem deleting the advertisings.",
    } as ErrorApi;
  }
}
