import {
  LicenseModelImageRequest,
  Orientation,
  SearchImagesEndpoint,
  SortOrder,
} from '../api';
import type { GettyPluginLocal } from '../api';

export const language: GettyPluginLocal = {
  title: 'Getty Images',
  placeholder: 'Search the world’s best images',
  noResults: 'Sorry, your search returned zero results for “{phrase}”',
  filter: {
    label: 'Filters',
    endpoint: {
      label: 'Image Type',
      items: {
        none: 'All',
        [SearchImagesEndpoint.Creative]: 'Creative',
        [SearchImagesEndpoint.Editorial]: 'Editorial',
      },
    },
    orientations: {
      label: 'Orientation',
      items: {
        none: 'All',
        [Orientation.Vertical]: 'Vertical',
        [Orientation.Horizontal]: 'Horizontal',
      },
    },
    sort_order: {
      label: 'Sort By',
      items: {
        [SortOrder.BestMatch]: 'Best Match',
        [SortOrder.MostPopular]: 'Most Popular',
        [SortOrder.Newest]: 'Newest',
      },
    },
  },
  meta: {
    license_model: {
      label: 'License type',
      items: {
        [LicenseModelImageRequest.RightsManaged]: 'Rights-Managed',
        [LicenseModelImageRequest.RoyaltyFree]: 'Royalty-free',
      },
    },
    collection_name: 'Collection',
    id: {
      labels: {
        editorial: 'Editorial #',
        creative: 'Creative #',
      },
    },
  },
};
