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

import { AdvancedUIItemCard, SearchField } from 'photoeditorsdk';

import { ToolbarUiProps } from '../BasicToolbar';
import { Spinner, Advanced } from '../Elements';
import { GettyImagesCards } from '../GettyImagesCards';

export const AdvancedToolbar = ({
  loading,
  loadingRef,
  pages,
  placeholder = '',
  setImage,
  setPhrase,
}: ToolbarUiProps): JSX.Element => {
  return (
    <Advanced.ToolbarWrapper>
      <Advanced.SearchDiv>
        <SearchField onChange={setPhrase} placeholder={placeholder} />
      </Advanced.SearchDiv>
      <Advanced.ScrollContainer>
        <Advanced.CardContainer>
          {pages.map((group, i) => (
            <GettyImagesCards
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              images={group.images}
              onClick={setImage}
              CardComponent={AdvancedUIItemCard}
            />
          ))}
          {loading && <Spinner />}
          {pages.length ? <div ref={loadingRef} /> : undefined}
        </Advanced.CardContainer>
      </Advanced.ScrollContainer>
    </Advanced.ToolbarWrapper>
  );
};
