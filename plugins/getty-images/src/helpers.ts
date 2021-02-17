/*
  This file is part of an img.ly Software Development Kit.
  Copyright (C) 2016-2021 img.ly GmbH <contact@img.ly>
  All rights reserved.
  Redistribution and use in source and binary forms, without
  modification, are permitted provided that the following license agreement
  is approved and a legal/financial contract was signed by the user.
  The license agreement can be found under the following link:
  https://www.photoeditorsdk.com/LICENSE.txt
*/
import {
  DisplaySize,
  DisplaySizeName,
  ImageSize,
  GettyImage,
  SearchImagesResponse,
  createAPIClient,
} from './api';

export const getHeight = (
  image: GettyImage,
  size: ImageSize,
): string | undefined => {
  const downloadSize = image.download_sizes.find(i => i.name === size);
  return downloadSize ? downloadSize.height.toString() : undefined;
};

export const getDisplaySize = (
  image: GettyImage,
  sizeName: DisplaySizeName,
): DisplaySize | undefined =>
  image.display_sizes.find(i => i.name === sizeName);

/**
 * Calculate received search results and check if more items available to request next page
 */
export const hasNextPage = (
  result: SearchImagesResponse[],
  maxPerPage: number,
): boolean => {
  const lastRes = result[result.length - 1];
  const totalReceived =
    result.length * maxPerPage - maxPerPage + lastRes.images.length;
  return lastRes.result_count > totalReceived;
};

type GettyStore = {
  img?: GettyImage;
  client?: ReturnType<typeof createAPIClient>;
};

let storeData: GettyStore = {};

/**
 * Store to synchronize toolbar and export button
 */
export const gettyStore = {
  set: (data: Partial<GettyStore>): void => {
    storeData = {
      ...storeData,
      ...data,
    };
  },
  get: (): GettyStore => storeData,
};
