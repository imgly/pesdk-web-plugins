import {
  useInfiniteQuery,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from 'react-query';

import {
  createAPIClient,
  SearchImagesEndpoint,
  SearchImagesParams,
  SearchImagesResponse,
} from '../api';

import { hasNextPage } from '../helpers';

interface Props {
  client: ReturnType<typeof createAPIClient>;
  pageSize: number;
  phrase?: string;
  searchParams?: Partial<SearchImagesParams>;
  endpoint?: SearchImagesEndpoint | null;
}

type Return = [
  SearchImagesResponse[],
  boolean,
  (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>,
];

export const useSearchImages = ({
  client,
  pageSize,
  phrase,
  searchParams,
  endpoint,
}: Props): Return => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['images', phrase, searchParams, endpoint],
      ({ pageParam = 1 }) => {
        const params: SearchImagesParams = {
          page: pageParam,
          page_size: pageSize,
          ...searchParams,
          phrase: phrase || '',
        };
        return client.searchImages(params, endpoint);
      },
      {
        retry: 3,
        getNextPageParam: (lastPage, pages) =>
          hasNextPage(pages, pageSize) ? lastPage.nextCursor : undefined,
      },
    );

  const loading = isFetching || isFetchingNextPage;

  return [data?.pages || [], loading, fetchNextPage];
};
