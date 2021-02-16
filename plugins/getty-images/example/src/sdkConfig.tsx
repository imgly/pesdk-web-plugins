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
import {
  createGettyImagesExportButton,
  createGettyImagesToolbar,
  GettyImagesExportButton,
  GettyImagesToolControlBar,
  OnConfirm,
} from '@pesdk/getty-images';
import {
  ExportFormat,
  Tool,
  Configuration,
  CustomToolProps,
  CustomButtonProps,
} from 'photoeditorsdk';
import React, { useCallback } from 'react';

const fetchToken = () => {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  };

  /**
   * For testing purpose you can get the token via API from https://api.gettyimages.com/oauth2/token
   * and use Promise.resolve to return the valid token
   */
  // return Promise.resolve('token');

  return fetch('http://localhost:9191/token', requestOptions)
    .then(response => response.json())
    .then(r => r.access_token);
};

// const GettyToolbar = createGettyImagesToolbar({
//         apiKey: 'srsn7qu3ampur9ar2zt49cw9',
//         fetchToken,
//         onError: num => {
//             console.log(`Caught error ${num}`);
//         },
//     })

// or create a react component
const GettyToolbar: React.FC<CustomToolProps> = props => {
  return (
    <GettyImagesToolControlBar
      {...props}
      apiKey={process.env.REACT_APP_API_KEY || ''}
      fetchToken={fetchToken}
      onError={num => {
        console.log(`Caught error ${num}`);
      }}
    />
  );
};

// const GettyExportBtn = createGettyImagesExportButton({
//         onConfirm: onLicense => {
//             if (window.confirm('Licence the image?')) {
//                 onLicense();
//             }
//         },
//     });

// or create react component
const GettyExportBtn: React.FC<CustomButtonProps> = props => {
  const onConfirm: OnConfirm = useCallback(onLicense => {
    if (window.confirm('Licence the image?')) {
      onLicense();
    }
  }, []);
  return <GettyImagesExportButton {...props} onConfirm={onConfirm} />;
};

export const sdkConfig: Configuration = {
  container: '.editor',
  license: '',
  assetBaseUrl: 'https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets',
  image:
    'https://images.unsplash.com/photo-1599713061074-9efa95376d3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
  defaultTool: Tool.CUSTOM,
  tools: [Tool.TRANSFORM, Tool.CUSTOM, Tool.FILTER, Tool.STICKER, Tool.TEXT],
  [Tool.CUSTOM]: {
    icon: () => <div>GIcon</div>,
    toolControlBar: GettyToolbar,
  },
  export: {
    image: {
      enableDownload: false,
      exportType: ExportFormat.DATA_URL,
    },
  },
  custom: {
    components: {
      buttons: {
        mainCanvasActionExport: GettyExportBtn,
      },
    },
    languages: {
      en: {
        customTool: {
          title: 'Getty Images',
        },
        mainCanvasActions: {
          buttonExport: 'Replace image',
        },
      },
    },
  },
};
