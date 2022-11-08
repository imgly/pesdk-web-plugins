import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ErrorNames, OnError } from '../types';

type TokenState = {
  isError: boolean;
  isLoading: boolean;
  token: string;
};

const initialState = {
  token: '',
  isError: false,
  isLoading: false,
};

export const useToken = (
  fetchTokenFn: () => Promise<string>,
  onError: OnError,
): TokenState & { refetchToken(): void } => {
  // use a ref to avoid updating state when the request is finished but the component unmounted
  const mounted = useRef(true);
  const [state, setState] = useState<TokenState>({
    ...initialState,
    isLoading: true,
  });

  const fetchToken = useCallback(() => {
    setState({
      ...initialState,
      isLoading: true,
    });
    fetchTokenFn()
      .then(token => {
        if (mounted.current) {
          setState({
            ...initialState,
            token,
          });
        }
      })
      .catch(e => {
        if (mounted.current) {
          setState({
            ...initialState,
            isError: true,
          });
        }
        onError(ErrorNames.TokenCannotFetch, e);
      });
  }, [fetchTokenFn, setState, onError]);

  // fetch token on mount
  useEffect(() => {
    fetchToken();
    return () => {
      mounted.current = false;
    };
  }, []);

  // use memo to pass the value into the context
  return useMemo(
    () => ({
      ...state,
      refetchToken: fetchToken,
    }),
    [state, fetchToken],
  );
};
