import React, { useCallback, useState } from 'react';

import {
  ContainedPrimaryButton,
  CustomButtonProps,
  useSetImage,
  DialogSpinner,
} from 'photoeditorsdk';

import { GettyImage, ImageSize } from './api';
import { getHeight, gettyStore } from './helpers';

export type OnConfirm = (
  onExportLicensedImage: () => Promise<string>,
  image: GettyImage,
  onLicense: () => Promise<string>,
  onClick: () => void,
) => void;

export type GettyImagesExportButtonProps = {
  /**
   * Function to be called before licensing an image
   * {function} callback to license an image
   * {GettyImage} image data object
   * {function} callback to trigger the licensing of the image
   * {function} callback to trigger an export for the currently loaded image
   */
  onConfirm: OnConfirm;
  /**
   * Image size to generate final output, defaults to: ImageSize.Medium = 'medium'
   */
  imageSize?: ImageSize;
};

export const GettyImagesExportButton: React.FC<
  CustomButtonProps & GettyImagesExportButtonProps
> = ({ onClick, onConfirm, imageSize = ImageSize.Medium, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const setImage = useSetImage();

  // license getty image
  const onLicenseImage = async () => {
    const { img, client } = gettyStore.get();
    if (!img || !client) {
      throw new Error(`Image or API client not found to proceed licensing`);
    }
    const { uri } = await client.downloadImage(img.id, {
      // download medium sized image or larges if not found
      height: getHeight(img, imageSize),
    });

    // image licensed, clean it up from the getty store
    gettyStore.set({
      img: undefined,
    });

    return uri;
  };

  // download the licensed image
  const onExportLicensedImage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setLoading(true);
      return onLicenseImage().then(uri => {
        setImage(uri);
        onClick(e);
        setLoading(false);
        return uri;
      });
    },
    [],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { img } = gettyStore.get();
      // skip licensing if getty images haven't been used
      if (!img) {
        onClick(e);
        return;
      }
      // request confirmation to get the license
      onConfirm(
        () => onExportLicensedImage(e),
        img,
        () => onLicenseImage(),
        () => onClick(e),
      );
    },
    [onClick, onLicenseImage, onConfirm],
  );
  if (loading) {
    return <DialogSpinner />;
  }
  return <ContainedPrimaryButton {...rest} onClick={handleClick} />;
};

export const createGettyImagesExportButton =
  (params: GettyImagesExportButtonProps): React.FC<CustomButtonProps> =>
  props => {
    return <GettyImagesExportButton {...props} {...params} />;
  };
