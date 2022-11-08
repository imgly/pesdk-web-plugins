import {
  LicenseModelImageRequest,
  Orientation,
  SearchImagesEndpoint,
  SortOrder,
} from './searchImages';

export interface GettyPluginLocal {
  title: string;
  placeholder: string;
  noResults: string;
  filter: {
    label: string;
    endpoint: {
      label: string;
      items: {
        none: string;
        [SearchImagesEndpoint.Creative]: string;
        [SearchImagesEndpoint.Editorial]: string;
      };
    };
    orientations: {
      label: string;
      items: {
        none: string;
        [Orientation.Vertical]: string;
        [Orientation.Horizontal]: string;
      };
    };
    sort_order: {
      label: string;
      items: {
        [SortOrder.BestMatch]: string;
        [SortOrder.MostPopular]: string;
        [SortOrder.Newest]: string;
      };
    };
  };
  meta: {
    license_model: {
      label: string;
      items: {
        [LicenseModelImageRequest.RightsManaged]: string;
        [LicenseModelImageRequest.RoyaltyFree]: string;
      };
    };
    collection_name: string;
    id: {
      labels: {
        editorial: string;
        creative: string;
      };
    };
  };
}
