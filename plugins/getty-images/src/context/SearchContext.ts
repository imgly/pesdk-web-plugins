import { createContext } from 'react';

import { SearchImagesEndpoint, SearchImagesParams } from '../api';

interface Props {
  phrase: string;
  debouncedPhrase: string;
  setPhrase: (value: string) => void;
  userEndpoint: SearchImagesEndpoint | null;
  setUserEndpoint: (value: SearchImagesEndpoint | null) => void;
  userSearchParams: Partial<SearchImagesParams>;
  setUserSearchParams: (
    key: string,
    value: SearchImagesParams[keyof SearchImagesParams],
  ) => void;
}

export const SearchContext = createContext<Props>({
  phrase: '',
  debouncedPhrase: '',
  setPhrase: () => null,
  userEndpoint: null,
  setUserEndpoint: () => null,
  userSearchParams: {},
  setUserSearchParams: () => null,
});
