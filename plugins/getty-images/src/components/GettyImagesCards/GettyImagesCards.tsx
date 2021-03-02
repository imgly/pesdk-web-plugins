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
import React from 'react';

import { CardType, CustomCardProps, Tool } from 'photoeditorsdk';

import { DisplaySizeName, GettyImage } from '../../api';
import { getDisplaySize } from '../../helpers';

type Props = {
  images: GettyImage[];
  onClick(image: GettyImage): void;
  CardComponent: React.ElementType<CustomCardProps>;
};

export const GettyImagesCards: React.FC<Props> = ({
  CardComponent,
  images,
  onClick,
}) => {
  return (
    <>
      {images.map((image, index) => (
        <CardComponent
          tool={Tool.CUSTOM}
          type={CardType.MEDIUM}
          onClick={() => onClick(image)}
          key={image.id}
          image={getDisplaySize(image, DisplaySizeName.Thumb)?.uri}
          label={image.title}
          style={{ animationDelay: `${index * 0.01}s` }}
        />
      ))}
    </>
  );
};
