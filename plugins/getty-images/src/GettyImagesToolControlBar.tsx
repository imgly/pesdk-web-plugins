import React, { useEffect, useMemo } from 'react';

import { CustomToolbar, CustomToolProps } from 'photoeditorsdk';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  createAPIClient,
  DisplaySizeName,
  SearchImagesEndpoint,
  SearchImagesParams,
} from './api';

import { Spinner } from './components/Elements';
import { gettyStore } from './helpers';

import { ToolControlBar } from './components/ToolControlBar';

import { useToken } from './hooks/useToken';
import { OnError } from './types';

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
  searchParams?: SearchImagesParams;
  /**
   * Image size for editor preview, defaults to: DisplaySizeName.High = 'high_res_comp'
   */
  displaySize?: DisplaySizeName;
  /**
   * Set the default endpoint for the image search, if no value is set all images will be searched on initialization
   */
  endpoint?: SearchImagesEndpoint;
  /**
   * Show a filter section above the images
   */
  showFilters?: boolean;
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

export const createGettyImagesToolbar =
  (props: GettyImagesToolbarProps): CustomToolbar =>
  (toolProps: CustomToolProps) => {
    return <GettyImagesToolControlBar {...toolProps} {...props} />;
  };
