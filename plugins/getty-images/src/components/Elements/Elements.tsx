import React from 'react';

import { DialogSpinner } from 'photoeditorsdk';
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

export const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
`;

export const NoResults = styled.div`
  hyphens: auto;
  color: ${props => props.theme.toolControlBar.titleForeground};
`;
