import { Label, DropdownCaret } from 'photoeditorsdk';
import styled from 'styled-components';

import { SearchDiv } from './Elements';

export const Advanced = {
  SearchDiv,
  ToolbarWrapper: styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    // will force the scrollbar in the ScrollContainer
    min-height: 0px;
    padding-top: 16px;
    padding-bottom: 16px;
    max-height: calc(100% - 32px);
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
  ControlsTrigger: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 0 24px 24px;
    cursor: pointer;
    height: 24px;
  `,
  ControlsLabel: styled(Label)`
    padding-bottom: 0px;
  `,
  Caret: styled(DropdownCaret)`
    position: unset;
  `,
};
