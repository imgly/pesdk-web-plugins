import React, { useContext } from 'react';

import { Dropdown } from 'photoeditorsdk';

import { SortOrder as SortOrderType } from '../../../api';
import { SearchContext } from '../../../context/SearchContext';
import { LanguageContext } from '../../../context/LanguageContext';

export const SortOrder: React.FC = () => {
  const { userSearchParams, setUserSearchParams } = useContext(SearchContext);
  const { filter } = useContext(LanguageContext);

  // check if the translation for the sort order is available
  if (!filter?.sort_order) {
    return null;
  }

  const sortOrder = [
    {
      label: filter.sort_order.items[SortOrderType.BestMatch],
      value: SortOrderType.BestMatch,
    },
    {
      label: filter.sort_order.items[SortOrderType.MostPopular],
      value: SortOrderType.MostPopular,
    },
    {
      label: filter.sort_order.items[SortOrderType.Newest],
      value: SortOrderType.Newest,
    },
  ];

  const selectedItem =
    sortOrder.find(({ value }) => value === userSearchParams.sort_order)
      ?.label || 'none';

  return (
    <Dropdown
      label={filter.sort_order.label}
      list={sortOrder}
      onSelect={value => setUserSearchParams('sort_order', value)}
      selectedItem={selectedItem}
    />
  );
};
