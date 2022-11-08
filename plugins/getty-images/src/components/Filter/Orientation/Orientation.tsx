import React, { useContext } from 'react';

import { Dropdown } from 'photoeditorsdk';

import { Orientation as OrientationType } from '../../../api';
import { SearchContext } from '../../../context/SearchContext';
import { LanguageContext } from '../../../context/LanguageContext';

export const Orientation: React.FC = () => {
  const { userSearchParams, setUserSearchParams } = useContext(SearchContext);
  const { filter } = useContext(LanguageContext);

  // check if the translation for the orientations is available
  if (!filter?.orientations) {
    return null;
  }

  const orientations = [
    { label: filter.orientations.items.none, value: 'none' },
    {
      label: filter.orientations.items[OrientationType.Vertical],
      value: OrientationType.Vertical,
    },
    {
      label: filter.orientations.items[OrientationType.Horizontal],
      value: OrientationType.Horizontal,
    },
  ];

  const selectedItem =
    orientations.find(
      ({ value }) =>
        userSearchParams.orientations?.includes(value) ||
        (!userSearchParams.orientations?.length && value === 'none'),
    )?.label || '';

  const handleSelect = (value: string) => {
    if (value === 'none') {
      setUserSearchParams('orientations', []);
    } else {
      setUserSearchParams('orientations', [value]);
    }
  };

  return (
    <Dropdown
      label={filter.orientations.label}
      list={orientations}
      onSelect={handleSelect}
      selectedItem={selectedItem}
    />
  );
};
