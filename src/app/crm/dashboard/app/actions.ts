'use server'

import { AdResponse, AdvertisingForm, ApiBooleanResponse, Error, HOSTNAME, UrlUpImageResponse } from "@/infrastructure";

async function uploadImage(id: string, image: File): Promise<string | Error> {
  try {
    const dataImage = {
      id,
      mime: image.type,
      ext: image.name.split('.').pop(),
      size: image.size
    }

    const responseUrl = await fetch(`${HOSTNAME}/api/advertising/${id}/upload/image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataImage),
      cache: 'no-store',
    })

    const url: UrlUpImageResponse = await responseUrl.json()
    if (!url.success) return url.error!

    const putRes = await fetch(url.data.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': image.type },
      body: image,
    });
    if (!putRes.ok) return { code: 'R2_UPLOAD_FAILED', message: 'R2 is failing.' }

    return url.data.key

  } catch (error) {
    return { code: 'ERROR_UPLOAD_IMAGE', message: 'There was an unknown problem uploading the image.' }
  }
}

async function attachImage(id: string, key: string): Promise<boolean | Error> {
  try {
    const response = await fetch(`${HOSTNAME}/api/advertising/${id}/photo/attach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
      cache: 'no-store',
    })

    const res: ApiBooleanResponse = await response.json()
    if (!res.success) return { code: 'ERROR_ATTACH_IMAGE', message: 'There was an unknown problem attaching the image.' }

    return true

  } catch (error) {
    return { code: 'ERROR_ATTACH_IMAGE', message: 'There was an unknown problem attaching the image.' }
  }
}


//! todo: el hostname deberia estar en .env
export async function createAdvertising(advData: AdvertisingForm): Promise< boolean | Error > {
  const adv = await fetch(`${HOSTNAME}/api/advertising/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(advData),
    cache: 'no-store',
  })
  const response: AdResponse = await adv.json()

  //! todo: saber si respondio con un success = true

  if (advData.type === 'IMAGE') {
    const { id } = response.data
    const image = advData.image1!

    const key: string | Error = await uploadImage(id, image)

    if (!(typeof key === 'string')) return key

    const attach: boolean | Error = await attachImage(id, key)

    if (!(typeof attach === 'boolean')) return attach

    return true
  }
  return true
}