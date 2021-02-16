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
import { ErrorNames, OnError } from '../types';

import { DownloadImageParams } from './downloadImages';
import {
  FileType,
  SearchImagesParams,
  SearchImagesResponse,
} from './searchImages';

export const baseUrl = 'https://api.gettyimages.com/v3/';

const paramsToString = <T extends any>(params: T) =>
  // quick solution instead of picking up the library to covert object to search params
  new URLSearchParams(params as any).toString();

const getRequestOptions = (apiKey: string, secret: string): RequestInit => {
  const myHeaders = new Headers();
  myHeaders.append('Api-Key', apiKey);
  myHeaders.append('Authorization', `Bearer ${secret}`);
  myHeaders.append('Content-Type', 'application/json');

  return {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
};

type GettyImageClientParams = {
  apiKey: string;
  token: string;
  refetchToken: () => void;
  onError: OnError;
};

const refetchMaxNum = 3;
// use refetch times constant to avoid recurcive getty requests
// should stop refetching after refetchMaxNum
let refetchTimes = 0;

export const createAPIClient = ({
  apiKey,
  token,
  refetchToken,
  onError,
}: GettyImageClientParams) => {
  const requestOptions = getRequestOptions(apiKey, `${token}`);
  return {
    searchImages: <T = SearchImagesResponse>(
      params: SearchImagesParams,
    ): Promise<T> =>
      fetch(
        `${baseUrl}search/images?${paramsToString<SearchImagesParams>({
          file_types: FileType.Jpg,
          fields: ['summary_set', 'download_sizes', 'display_set'],
          ...params,
        })}`,
        requestOptions,
      )
        .then(res => {
          if (!res.ok) {
            switch (res.status) {
              case 400: {
                onError(ErrorNames.InvalidParameterValue);
                break;
              }
              // AuthorizationTokenRequired
              case 401: {
                if (refetchTimes >= refetchMaxNum) {
                  onError(ErrorNames.TokenRefetchLimit);
                  throw new Error();
                } else {
                  refetchTimes += 1;
                  refetchToken();
                }
                break;
              }
              // UnauthorizedDisplaySize
              case 403: {
                onError(ErrorNames.UnauthorizedDisplaySize);
                break;
              }
              default:
            }
            throw new Error();
          }
          refetchTimes = 0;
          return res.json();
        })
        .then(data => ({
          ...data,
          nextCursor: (params.page || 1) + 1,
        })),
    downloadImage: (
      id: number,
      params?: DownloadImageParams,
    ): Promise<{ uri: string }> =>
      fetch(
        `${baseUrl}downloads/images/${id}?${paramsToString<DownloadImageParams>(
          {
            auto_download: false,
            file_type: FileType.Jpg,
            ...params,
          },
        )}`,
        { ...requestOptions, method: 'POST' },
      ).then(e => e.json()),
  };
};
