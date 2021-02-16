# Getty Images plugin for PhotoEditor SDK

### Prerequisite

This plugin helps to integrate Getty Images API into PhotoEditorSDK.

You need to use own backend endpoint that provides [OAuth token](https://developer.gettyimages.com/docs/oauth-2.0/) for Getty Images API.


### Getting Started

```shell
yarn add @pesdk/getty-images
// npm install @pesdk/getty-images
```


```typescript
import { Tool, CustomButtonProps } from 'photoeditorsdk';
const sdkConfiguration = {
  // include custom tool into tools list
  tools: [Tool.CUSTOM, Tool.TRANSFORM],
  // provide tool configuration
  [Tool.CUSTOM]: {
    // toolbar icon
    icon: React.ElementType,
    // See Toolbar component API
    toolControlBar: React.ElementType 
  },
  custom: {
    components: {
      buttons: {
        // Export action behaviour for Getty Images usage
        // See Export button API
        mainCanvasActionExport: React.ElementType<CustomButtonProps>
      },
    },
    languages: {
      en: {
        customTool: {
          // toolbar title
          title: 'Getty Images',
          // ...other localization strings
        },
      },
    },
  },
}
```

### Toolbar component

Default Getty Images toolbar represents a debounced input for search
and infinite images grid using:

* [react-query](https://github.com/tannerlinsley/react-query)
* [use-debounce](https://github.com/xnimorz/use-debounce)
* [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

```typescript jsx

import { GettyImagesToolbarProps } from '@pesdk/getty-images'
// equivalent to
export type GettyImagesToolbarProps = {
    // public getty images api key
    apiKey: string;
    // promise that returns OAuth token
    fetchToken(): Promise<string>;
    // handle errors occurred during API call
    onError: OnError;
    /**
     * configure image search params
     * Typescript types https://github.com/imgly/pesdk-web-plugins/blob/main/plugins/getty-images/src/api/searchImages.ts
     * Getty API https://api.gettyimages.com/swagger/index.html#Images
     */
    searchParams?: SearchImagesParams;
    // image size for editor preview, default DisplaySizeName.High = 'high_res_comp'
    displaySize?: DisplaySizeName;
};

const params: GettyImagesToolbarProps = {}
// non-react environment
const GettyToolbar = createGettyImagesToolbar(params);
// react environment
const GettyToolbarAlt: React.FC<CustomToolProps> = props => {
    return (
        <GettyImagesToolControlBar
            {...props}
            {...params}
        />
    );
};
```

#### Customization

You can replace toolbar using any library that you want or have in
the app environment.

To override toolbar you must keep:

* createAPIClient instance
* gettyStore calls
* `handleSetImage` function

### Export button

The export button should be used to get higher resolution and license Getty image.

```typescript jsx

import { GettyImagesExportButtonProps } from '@pesdk/getty-images'
// equivalent to

export type GettyImagesExportButtonProps = {
    /**
     * Function to be called before licensing an image
     * {function} callback to license an image
     * {GettyImage} image data object
     */
    onConfirm: OnConfirm;
    // image size to generate final output, default ImageSize.Medium = 'medium'
    imageSize?: ImageSize;
};
const params: GettyImagesExportButtonProps = {}
// non-react environment
const ExportButton = createGettyImagesExportButton(params);
// react environment
const ExportButtonAlt: React.FC<CustomButtonProps> = props => {
    return (
        <GettyImagesExportButton
            {...props}
            {...params}
        />
    );
};
```

#### Customization

You can replace the export button with a custom one.

To override toolbar you must keep:

* Passing custom button props if `ContainedPrimaryButton` going to be used
* `onLicenseImage` function


## PhotoeditorSDK Documentation
Visit our [docs](https://docs.photoeditorsdk.com)

## Examples
[PhotoeditorSDK & GettyImages example](https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/example)
[PhotoeditorSDK examples](https://www.photoeditorsdk.com/)

## License
Please see [LICENSE](https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/LICENSE.md) for licensing details.

## Support and License
Use our [service desk](https://support.photoeditorsdk.com) for bug reports or support requests. To request a commercial license, please use the [license request form](https://www.photoeditorsdk.com/pricing) on our website.
