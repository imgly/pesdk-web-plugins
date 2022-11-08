import React, { useContext, useState } from 'react';

import { AdvancedUIControlsBarSection } from 'photoeditorsdk';

import { Advanced } from '../Elements';
import { Endpoint, Orientation, SortOrder } from '../Filter';
import { LanguageContext } from '../../context/LanguageContext';

export const AdvancedFilter: React.FC = () => {
  const { filter } = useContext(LanguageContext);

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(show => !show);
  };

  // check if the translation for the filter is available
  if (!filter?.label) {
    return null;
  }

  return (
    <>
      <Advanced.ControlsTrigger onClick={handleClick}>
        <Advanced.ControlsLabel label={filter.label} />
        <Advanced.Caret rotation={show ? 180 : 0} />
      </Advanced.ControlsTrigger>
      <AdvancedUIControlsBarSection show={show}>
        <Endpoint />
        <Orientation />
        <SortOrder />
      </AdvancedUIControlsBarSection>
    </>
  );
};
