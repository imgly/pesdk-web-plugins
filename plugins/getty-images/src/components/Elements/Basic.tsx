import { AdvancedUIItemCard } from 'photoeditorsdk';
import styled from 'styled-components';

export const Basic = {
  SearchDiv: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 24px 24px;
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
    height: ${props =>
      props.theme.measurements.basicUIToolControlBar.itemsBarHeight}px;
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
