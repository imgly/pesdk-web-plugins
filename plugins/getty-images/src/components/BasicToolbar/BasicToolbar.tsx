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

import { SearchField } from 'photoeditorsdk';

import { GettyImage, SearchImagesResponse } from '../../api';
import { Basic, Spinner } from '../Elements';
import { GettyImagesCards } from '../GettyImagesCards';

export type ToolbarUiProps = {
  loading: boolean;
  loadingRef: React.MutableRefObject<HTMLDivElement | null>;
  pages: SearchImagesResponse[];
  placeholder?: string;
  setImage(img: GettyImage): Promise<void>;
  setPhrase(value: string): void;
};

export const BasicToolbar = ({
  loading,
  loadingRef,
  pages,
  placeholder = '',
  setImage,
  setPhrase,
}: ToolbarUiProps): JSX.Element => {
  const hasPages = Boolean(pages.length);
  return (
    <Basic.ToolbarWrapper>
      <Basic.SearchDiv>
        <SearchField onChange={setPhrase} placeholder={placeholder} />
      </Basic.SearchDiv>
      <Basic.ScrollContainer>
        <Basic.CardContainer>
          {hasPages && (
            <>
              {pages.map((group, i) => (
                <GettyImagesCards
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  images={group.images}
                  onClick={setImage}
                  CardComponent={Basic.Card}
                />
              ))}
              {loading && <Spinner />}
              <div ref={loadingRef} />
            </>
          )}
        </Basic.CardContainer>
        {!hasPages && loading ? <Spinner paddingY={10} /> : null}
      </Basic.ScrollContainer>
    </Basic.ToolbarWrapper>
  );
};
