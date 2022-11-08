import {
  Configuration,
  CustomButtonProps,
  CustomToolProps,
  CustomWindowContainerProps,
  ExportFormat,
  Tool,
} from 'photoeditorsdk';
import React, { useCallback } from 'react';
import {
  GettyImagesExportButton,
  GettyImagesToolControlBar,
  OnConfirm,
  SearchImagesEndpoint,
  SortOrder,
} from '..';
import { GettyImagesMetaInformation } from '../GettyImagesMetaInformation';

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

const apiKey = import.meta.env.VITE_APP_API_KEY || '';
// const GettyToolbar = createGettyImagesToolbar({
//         apiKey,
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
      apiKey={apiKey}
      fetchToken={fetchToken}
      searchParams={{
        sort_order: SortOrder.BestMatch,
        orientations: [],
        phrase: 'Adventure',
      }}
      endpoint={SearchImagesEndpoint.Editorial}
      onError={num => {
        console.log(`Caught error ${num}`);
      }}
    />
  );
};

// const GettyExportBtn = createGettyImagesExportButton({
//         onConfirm: onLicense => {
//             if (window.confirm('License the image?')) {
//                 onLicense();
//             }
//         },
//     });

// or create react component
const GettyExportBtn: React.FC<CustomButtonProps> = props => {
  const onConfirm: OnConfirm = useCallback(onLicense => {
    if (window.confirm('License the image?')) {
      onLicense();
    }
  }, []);
  return <GettyImagesExportButton {...props} onConfirm={onConfirm} />;
};

const CustomWindowContainer: React.FC<CustomWindowContainerProps> = ({
  tool,
  children,
}) => (
  <>
    {children}
    {tool === Tool.CUSTOM && <GettyImagesMetaInformation />}
  </>
);

export const sdkConfig: Configuration = {
  container: '.editor',
  license: '',
  assetBaseUrl:
    'https://cdn.img.ly/packages/imgly/photoeditorsdk/latest/assets',
  image: '',
  defaultTool: Tool.CUSTOM,
  tools: [Tool.CUSTOM, Tool.TRANSFORM, Tool.BRUSH, Tool.FILTER],
  [Tool.CUSTOM]: {
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        height={48}
        viewBox="0 0 98 97"
        xmlSpace="preserve"
      >
        <g fill="currentColor">
          <path d="M67.022 22.86c-4.467-.143-7.421.997-9.238 3.277-2.423-1.995-6.36-3.277-9.692-3.277-10.224 0-15.524 6.41-15.524 12.894 0 4.489 2.575 7.338 5.831 9.832-1.741.499-6.134 3.205-6.134 6.767 0 3.99 4.013 4.916 5.83 5.984v.143c-3.407 0-7.117 2.208-7.117 6.84 0 5.841 6.966 8.832 17.568 8.832 12.57 0 18.25-5.698 18.25-10.97 0-14.818-25.898-6.696-25.898-12.681 0-2.137 3.256-2.28 7.344-2.28 9.844 0 14.842-4.987 14.842-11.968 0-2.85-.909-4.987-2.12-6.554 1.44-.855 3.862-.855 6.058-.855V22.86zM46.274 59.904c9.087 0 11.888 2.565 11.888 4.275 0 1.282-2.044 4.132-8.102 4.132-7.875 0-10.45-1.283-10.45-4.132 0-1.567 1.515-4.275 6.664-4.275zm1.742-18.237c-4.013 0-6.816-2.706-6.816-6.127s2.803-6.126 6.816-6.126c3.558 0 6.436 2.706 6.436 6.126s-2.878 6.127-6.436 6.127z" />
        </g>
      </svg>
    ),
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
      windowContainer: CustomWindowContainer,
    },
    languages: {
      en: {
        customTool: {
          title: 'Getty Images',
          placeholder: 'Search the world’s best images',
        },
        mainCanvasActions: {
          buttonExport: 'Export image',
        },
      },
    },
  },
};
