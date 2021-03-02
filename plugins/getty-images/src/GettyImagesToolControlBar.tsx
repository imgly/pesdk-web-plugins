/*
  This file is part of an img.ly Software Development Kit.
  Copyright (C) 2016-2021 img.ly GmbH <contact@img.ly>
  All rights reserved.
  Redistribution and use in source and binary forms, without
  modification, are permitted provided that the following license agreement
  is approved and a legal/financial contract was signed by the user.
  The license agreement can be found under the following link:
  https://www.photoeditorsdk.com/LICENSE.txt
*/

import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  CustomToolbar,
  CustomToolProps,
  useIsLayoutAdvanced,
  useSetImage,
} from 'photoeditorsdk';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from 'react-query';
import { useDebounce } from 'use-debounce';

import {
  createAPIClient,
  DisplaySizeName,
  GettyImage,
  SearchImagesParams,
} from './api';
import { AdvancedToolbar } from './components/AdvancedToolbar';
import { BasicToolbar, ToolbarUiProps } from './components/BasicToolbar';
import { Spinner } from './components/Elements';
import { getDisplaySize, gettyStore, hasNextPage } from './helpers';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useToken } from './hooks/useToken';
import { ErrorNames, OnError } from './types';

interface Props {
  client: ReturnType<typeof createAPIClient>;
  language: CustomToolProps['language'];
  onError: OnError;
  searchParams?: Partial<SearchImagesParams>;
  displaySize?: DisplaySizeName;
}

const pageSize = 30;
const ToolControlBar: React.FC<Props> = ({
  language,
  client,
  searchParams,
  onError,
  displaySize = DisplaySizeName.High,
}) => {
  const [phrase, setPhrase] = useState('');
  const [debouncedPhrase] = useDebounce(phrase, 1000);
  const setImage = useSetImage();
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const isAdvancedLayout = useIsLayoutAdvanced();

  const ToolbarComponent: React.ElementType<ToolbarUiProps> = isAdvancedLayout
    ? AdvancedToolbar
    : BasicToolbar;

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['images', debouncedPhrase, searchParams],
    ({ pageParam = 1 }) => {
      const params: SearchImagesParams = {
        phrase: debouncedPhrase,
        page: pageParam,
        page_size: pageSize,
        ...searchParams,
      };
      return client.searchImages(params);
    },
    {
      retry: 3,
      getNextPageParam: (lastPage, pages) =>
        hasNextPage(pages, pageSize) ? lastPage.nextCursor : undefined,
    },
  );

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

  const loading = isFetching || isFetchingNextPage;

  useIntersectionObserver({
    target: loadingRef,
    onIntersect: fetchNextPage,
    enabled: !loading,
  });

  return (
    <ToolbarComponent
      loading={loading}
      loadingRef={loadingRef}
      placeholder={language.placeholder}
      setPhrase={setPhrase}
      setImage={handleSetImage}
      pages={data?.pages || []}
    />
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export type GettyImagesToolbarProps = {
  /**
   * Public getty images api key
   */
  apiKey: string;
  /**
   * Promise that returns OAuth token
   */
  fetchToken(): Promise<string>;
  /**
   * Handle errors occurred during API call
   * https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/src/types.ts
   */
  onError: OnError;
  /**
   * Configure image search params
   * Typescript types https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/src/api/searchImages.ts
   * Getty API https://api.gettyimages.com/swagger/index.html#Images
   */
  searchParams?: Omit<SearchImagesParams, 'phrase'>;
  /**
   * image size for editor preview, default DisplaySizeName.High = 'high_res_comp'
   */
  displaySize?: DisplaySizeName;
  /**
   * React component to show when token endpoint fails
   */
  ErrorComponent?: React.ElementType<{ language: CustomToolProps['language'] }>;
};

const Error = ({ language }: { language: CustomToolProps['language'] }) => (
  <div>{language.error || 'Error'}</div>
);

export const GettyImagesToolControlBar: React.FC<
  CustomToolProps & GettyImagesToolbarProps
> = ({ fetchToken, apiKey, onError, ErrorComponent = Error, ...rest }) => {
  const { token, isLoading, isError, refetchToken } = useToken(
    fetchToken,
    onError,
  );

  const client = useMemo(() => {
    return createAPIClient({
      apiKey,
      token,
      refetchToken,
      onError,
    });
  }, [token, refetchToken]);

  useEffect(() => {
    // save client to use for licensing
    gettyStore.set({
      client,
    });
  }, [client]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorComponent language={rest.language} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToolControlBar {...rest} onError={onError} client={client} />
    </QueryClientProvider>
  );
};

export const createGettyImagesToolbar = (
  props: GettyImagesToolbarProps,
): CustomToolbar => (toolProps: CustomToolProps) => {
  return <GettyImagesToolControlBar {...toolProps} {...props} />;
};
