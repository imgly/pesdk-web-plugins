import React, { useContext, useMemo } from 'react';
import { Dropdown, DropdownListItem } from 'photoeditorsdk';

import { SearchContext } from '../../../context/SearchContext';

import { SearchImagesEndpoint } from '../../../api';
import { LanguageContext } from '../../../context/LanguageContext';

export const Endpoint: React.FC = () => {
  const { userEndpoint, setUserEndpoint } = useContext(SearchContext);
  const { filter } = useContext(LanguageContext);

  let endpoints: DropdownListItem[] = [];

  if (filter?.endpoint) {
    endpoints = [
      { label: filter.endpoint.items.none, value: 'none' },
      {
        label: filter.endpoint.items[SearchImagesEndpoint.Creative],
        value: SearchImagesEndpoint.Creative,
      },
      {
        label: filter.endpoint.items[SearchImagesEndpoint.Editorial],
        value: SearchImagesEndpoint.Editorial,
      },
    ];
  }

  const selectedItem = useMemo(
    () =>
      endpoints.find(
        ({ value }) =>
          value === userEndpoint || (!userEndpoint && value === 'none'),
      )?.label || '',
    [userEndpoint],
  );

  const handleSelect = (value: string) => {
    if (value === 'none') {
      setUserEndpoint(null);
    } else {
      setUserEndpoint(value as SearchImagesEndpoint);
    }
  };

  // check if the translation for the endpoint is available
  if (!filter?.endpoint) {
    return null;
  }

  return (
    <Dropdown
      label={filter.endpoint.label}
      list={endpoints}
      onSelect={handleSelect}
      selectedItem={selectedItem}
    />
  );
};
