# Getty Images plugin for PhotoEditor SDK

This plugin helps to integrate Getty Images API into PhotoEditor SDK.

### Prerequisite

You need to use your backend endpoint that provides an [OAuth token](https://developer.gettyimages.com/docs/oauth-2.0/) for the Getty Images API.

### Getting Started

```shell
yarn add @pesdk/getty-images
```

or

```
npm install --save @pesdk/getty-images
```

```typescript
import { Tool, CustomButtonProps } from "photoeditorsdk";
const sdkConfiguration = {
  // include custom tool into tools list
  tools: [Tool.CUSTOM, Tool.TRANSFORM],
  // provide tool configuration
  [Tool.CUSTOM]: {
    // toolbar icon
    icon: React.ElementType,
    // See Toolbar component API
    toolControlBar: React.ElementType,
  },
  custom: {
    components: {
      buttons: {
        // Export action behaviour for Getty Images usage
        // See Export button API
        mainCanvasActionExport: React.ElementType<CustomButtonProps>,
      },
    },
    languages: {
      en: {
        customTool: {
          // toolbar title
          title: "Getty Images",
          // ...other localization strings
        },
      },
    },
  },
};
```

## Examples

[PhotoEditor SDK & Getty Images example](https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/example)

[Codesandox](https://codesandbox.io/s/getty-images-react-81i4g?file=/src/App.tsx)

### Toolbar component

Default Getty Images toolbar represents a debounced input for search
and infinite images grid using:

- [react-query](https://github.com/tannerlinsley/react-query)
- [use-debounce](https://github.com/xnimorz/use-debounce)
- [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

```typescript jsx
import { GettyImagesToolbarProps } from "@pesdk/getty-images";
// equivalent to
export type GettyImagesToolbarProps = {
  // public getty images api key
  apiKey: string;
  // promise that returns OAuth token
  fetchToken(): Promise<string>;
  /**
   * handle errors occurred during API call
   * https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/src/types.ts
   */
  onError: OnError;
  /**
   * configure image search params
   * Typescript types https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/src/api/searchImages.ts
   * Getty API https://api.gettyimages.com/swagger/index.html#Images
   */
  searchParams?: SearchImagesParams;
  // image size for editor preview, default DisplaySizeName.High = 'high_res_comp'
  displaySize?: DisplaySizeName;
};

const params: GettyImagesToolbarProps = {};
// non-react environment
const GettyToolbar = createGettyImagesToolbar(params);
// react environment
const GettyToolbarAlt: React.FC<CustomToolProps> = (props) => {
  return <GettyImagesToolControlBar {...props} {...params} />;
};
```

#### Customization

You can replace the toolbar using any library that you want or have in
the app environment.

To override the toolbar you must keep:

- `createAPIClient` instance
- `gettyStore` calls
- `handleSetImage` function

### Export button

The export button should be used to get a higher resolution and licensed image from Getty Images.

```typescript jsx
import { GettyImagesExportButtonProps } from "@pesdk/getty-images";
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
const params: GettyImagesExportButtonProps = {};
// non-react environment
const ExportButton = createGettyImagesExportButton(params);
// react environment
const ExportButtonAlt: React.FC<CustomButtonProps> = (props) => {
  return <GettyImagesExportButton {...props} {...params} />;
};
```

#### Customization

You can replace the export button with a custom one.

To override the toolbar you must keep:

- Passing custom button props if `ContainedPrimaryButton` is going to be used
- `onLicenseImage` function

## Localization

The plugin accepts `title` and `placeholder` string in [localization object](https://img.ly/docs/pesdk/web/customization/localization/)

```json
{
  "custom": {
    "en": {
      "customTool": {
        "title": "Getty Images",
        "placeholder": "Search the world’s best images"
      }
    }
  }
}
```

## PhotoEditor SDK Documentation

Visit our [docs](https://img.ly/docs/pesdk/)

## License

Please see [LICENSE](https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/LICENSE.md) for licensing details.

## Support and License

Use our [service desk](https://img.ly/support) for bug reports or support requests. To request a commercial license, please use the [license request form](https://www.img.ly/pricing) on our website.
