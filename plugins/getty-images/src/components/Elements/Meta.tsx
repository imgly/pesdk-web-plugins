import styled from 'styled-components';

export const MetaInformationContainer = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  padding: 16px 2%;

  height: 150px;
  justify-content: space-between;

  user-select: text;
`;

export const DetailsContainer = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
`;

export const DetailsRow = styled.div`
  display: table-row;
`;

export const MetaInformationTitle = styled.h1`
  font-size: ${props => props.theme.measurements.fontSystem.headline1.size}px;
  letter-spacing: ${props =>
    props.theme.measurements.fontSystem.headline1.letterSpacing}px;
  font-weight: 500;
  color: ${props => props.theme.toolControlBar.titleForeground};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MetaInformationCaption = styled.h2`
  font-size: ${props => props.theme.measurements.fontSystem.headline2.size}px;
  letter-spacing: ${props =>
    props.theme.measurements.fontSystem.headline2.letterSpacing}px;
  font-weight: 500;
  color: ${props => props.theme.toolControlBar.titleForeground};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MetaInformationLabel = styled.span`
  display: table-cell;

  font-size: ${props => props.theme.measurements.fontSystem.body.size}px;
  letter-spacing: ${props =>
    props.theme.measurements.fontSystem.body.letterSpacing}px;
  text-transform: ${props => props.theme.measurements.fontSystem.body.case};
  color: ${props => props.theme.toolControlBar.titleForeground};

  width: 128px;
  padding-right: 16px;
  padding-bottom: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MetaInformationText = styled.span`
  display: table-cell;

  font-size: ${props => props.theme.measurements.fontSystem.body.size}px;
  letter-spacing: ${props =>
    props.theme.measurements.fontSystem.body.letterSpacing}px;
  text-transform: ${props => props.theme.measurements.fontSystem.body.case};
  color: ${props => props.theme.textInput.foreground};

  padding-bottom: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
