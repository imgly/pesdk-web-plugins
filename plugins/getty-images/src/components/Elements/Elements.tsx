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

import { AdvancedUIItemCard, DialogSpinner } from 'photoeditorsdk';
import styled from 'styled-components';

const SpinnerWrapper = styled.div<{ paddingY?: number }>`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  padding: ${({ paddingY = 0 }) => `${paddingY}px 10px`};
`;

export const Spinner: React.FC<{ paddingY?: number }> = ({ paddingY }) => (
  <SpinnerWrapper paddingY={paddingY}>
    <DialogSpinner />
  </SpinnerWrapper>
);

export const Advanced = {
  SearchDiv: styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 16px 0px;
  `,
  ToolbarWrapper: styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    // will force the scrollbar in the ScrollContainer
    min-height: 0px;
  `,
  ScrollContainer: styled.div`
    display: flex;
    flex: 1 1 auto;
    padding: 16px 24px;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
  `,
  CardContainer: styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    /* width - padding on both sides */
    width: ${props =>
      props.theme.measurements.advancedUIToolControlBar.width - 48}px;
  `,
};

export const Basic = {
  SearchDiv: styled(Advanced.SearchDiv)`
    margin-bottom: 16px;
    width: 30%;
    @media all and (min-width: 0) and (max-width: 599px) {
      width: 60%;
    }
  `,
  ToolbarWrapper: styled.div`
    display: flex;
    overflow: auto hidden;
    align-items: center;
    flex-direction: column;
    width: 100%;
  `,
  ScrollContainer: styled.div`
    display: flex;
    overflow: auto hidden;
    width: 100%;
  `,
  CardContainer: styled.ul.attrs(() => ({
    role: 'menubar',
    'aria-label': 'Tool Navigation',
  }))`
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  Card: styled(AdvancedUIItemCard)`
    margin: 2px;
    min-width: ${props => props.theme.measurements.basicCard.medium.width}px;
    height: ${props => props.theme.measurements.basicCard.medium.height}px;
    &:nth-child(2n + 1) {
      margin-right: 2px;
    }
  `,
};
