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
