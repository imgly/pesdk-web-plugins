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

import { DialogSpinner } from 'photoeditorsdk';
import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  // will force the scrollbar in the ScrollContainer
  min-height: 0px;
`;

export const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0px;
`;

export const ScrollContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  padding: 16px 24px;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const CardContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  /* width - padding on both sides */
  width: ${props =>
    props.theme.measurements.advancedUIToolControlBar.width - 48}px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
`;

export const Spinner: React.FC = () => (
  <SpinnerWrapper>
    <DialogSpinner />
  </SpinnerWrapper>
);
