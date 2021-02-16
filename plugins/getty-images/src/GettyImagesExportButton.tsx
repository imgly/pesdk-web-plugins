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
import React, { useCallback, useState } from 'react';

import {
  ContainedPrimaryButton,
  CustomButtonProps,
  useSetImage,
  DialogSpinner,
} from 'photoeditorsdk';

import { GettyImage, ImageSize } from './api';
import { getHeight, gettyStore } from './helpers';

export type OnConfirm = (onLicense: () => void, image: GettyImage) => void;

export type GettyImagesExportButtonProps = {
  /**
   * Function to be called before licensing an image
   * {function} callback to license an image
   * {GettyImage} image data object
   */
  onConfirm: OnConfirm;
  // image size to generate final output, default ImageSize.Medium = 'medium'
  imageSize?: ImageSize;
};

export const GettyImagesExportButton: React.FC<
  CustomButtonProps & GettyImagesExportButtonProps
> = ({ onClick, onConfirm, imageSize = ImageSize.Medium, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const setImage = useSetImage();

  // license getty image
  const onLicenseImage: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      const { img, client } = gettyStore.get();
      if (!img || !client) {
        // todo fire an error
        return;
      }
      setLoading(true);
      client
        .downloadImage(img.id, {
          // download medium sized image or larges if not found
          height: getHeight(img, imageSize),
        })
        .then(({ uri }) => {
          setImage(uri);
          onClick(e);
          setLoading(false);
          // image licensed, clean it up from the getty store
          gettyStore.set({
            img: undefined,
          });
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
      onConfirm(() => onLicenseImage(e), img);
    },
    [onClick, onLicenseImage, onConfirm],
  );
  if (loading) {
    return <DialogSpinner />;
  }
  return <ContainedPrimaryButton {...rest} onClick={handleClick} />;
};

export const createGettyImagesExportButton = (
  params: GettyImagesExportButtonProps,
): React.FC<CustomButtonProps> => props => {
  return <GettyImagesExportButton {...props} {...params} />;
};
