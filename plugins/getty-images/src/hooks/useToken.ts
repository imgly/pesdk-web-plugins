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
