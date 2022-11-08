import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  CustomToolProps,
  deepmergeAll,
  useIsLayoutAdvanced,
  useSetImage,
  useGetImage,
} from 'photoeditorsdk';

import { useDebounce } from 'use-debounce';
import {
  createAPIClient,
  DisplaySizeName,
  GettyImage,
  SearchImagesEndpoint,
  SearchImagesParams,
  GettyPluginLocal,
} from '../../api';
import { AdvancedToolbar } from '../AdvancedToolbar';
import { BasicToolbar } from '../BasicToolbar';
import { ToolbarUiProps } from '../types';
import { getDisplaySize, gettyStore } from '../../helpers';
import { ErrorNames, OnError } from '../../types';
import { useSearchImages } from '../../hooks/useSearchImages';
import { SearchContext } from '../../context/SearchContext';
import { LanguageContext } from '../../context/LanguageContext';
import { language as defaultLanguage } from '../../defaults/language';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface Props {
  client: ReturnType<typeof createAPIClient>;
  language: CustomToolProps['language'];
  onError: OnError;
  searchParams?: Partial<SearchImagesParams>;
  displaySize?: DisplaySizeName;
  endpoint?: SearchImagesEndpoint;
  showFilters?: boolean;
}

const pageSize = 30;

export const ToolControlBar: React.FC<Props> = ({
  language,
  client,
  searchParams,
  onError,
  displaySize = DisplaySizeName.High,
  endpoint,
  showFilters,
}) => {
  const loadedImage = useGetImage();
  const [loadedInitialImage, setLoadedInitialImage] = useState(!!loadedImage);
  const [phrase, setPhrase] = useState(searchParams?.phrase || '');
  const [debouncedPhrase] = useDebounce(phrase, 500);

  const [userSearchParams, setUserParams] = useState<
    Partial<SearchImagesParams>
  >(searchParams || {});

  const [userEndpoint, setUserEndpoint] = useState<SearchImagesEndpoint | null>(
    endpoint || null,
  );

  const loadingRef = useRef<HTMLDivElement | null>(null);

  const setImage = useSetImage();
  const handleSetImage = async (img: GettyImage) => {
    const imgSize = getDisplaySize(img, displaySize);
    if (imgSize) {
      // save image to store, used for licensing on export
      gettyStore.set({
        img,
      });
      await setImage(imgSize.uri);
    } else {
      onError(ErrorNames.ImageSizeNotFound);
    }
  };

  const setUserSearchParams = (
    key: string,
    value: SearchImagesParams[keyof SearchImagesParams],
  ) => {
    setUserParams(state => ({ ...state, [key]: value }));
  };

  const [pages, loading, fetchNextPage] = useSearchImages({
    client,
    searchParams: userSearchParams,
    // use a debounced value here to limit update amount
    phrase: debouncedPhrase,
    endpoint: userEndpoint,
    pageSize,
  });

  useEffect(() => {
    if (!loading && pages.length && !loadedInitialImage) {
      const randomNum = Math.floor(Math.random() * pageSize);

      handleSetImage(pages[0].images[randomNum]);
      setLoadedInitialImage(true);
    }
  }, [loading]);

  const isAdvancedLayout = useIsLayoutAdvanced();

  const ToolbarComponent: React.ElementType<ToolbarUiProps> = isAdvancedLayout
    ? AdvancedToolbar
    : BasicToolbar;

  useIntersectionObserver({
    target: loadingRef,
    onIntersect: fetchNextPage,
    enabled: !loading,
  });

  const mergedLanguages: GettyPluginLocal = useMemo(() => {
    return deepmergeAll([defaultLanguage, language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={mergedLanguages}>
      <SearchContext.Provider
        value={{
          phrase,
          debouncedPhrase,
          setPhrase,
          userEndpoint,
          setUserEndpoint,
          userSearchParams,
          setUserSearchParams,
        }}
      >
        <ToolbarComponent
          loading={loading}
          loadingRef={loadingRef}
          placeholder={language.placeholder}
          setImage={handleSetImage}
          pages={pages}
          showFilters={showFilters}
        />
      </SearchContext.Provider>
    </LanguageContext.Provider>
  );
};
