import {
  DisplaySize,
  DisplaySizeName,
  ImageSize,
  GettyImage,
  SearchImagesResponse,
  createAPIClient,
} from './api';

/**
 * Find the height for imageSize in download_sizes
 * or return an empty string that downloads the largest available image.
 */
export const getHeight = (image: GettyImage, size: ImageSize): string => {
  const downloadSize = image.download_sizes.find(i => i.name === size);
  return downloadSize ? downloadSize.height.toString() : '';
};

export const getDisplaySize = (
  image: GettyImage,
  sizeName: DisplaySizeName,
): DisplaySize => {
  const displaySize = image.display_sizes.find(i => i.name === sizeName);

  if (displaySize) {
    return displaySize;
  }

  return image.display_sizes[0];
};

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
