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
export enum GraphicalStyle {
  FineArt = 'fine_art',
  Illustration = 'illustration',
  Photography = 'photography',
  Vector = 'vector',
}
export enum Composition {
  Portrait = 'portrait',
  Abstract = 'abstract',
  CloseUp = 'closeup',
  StillLife = 'stilllife',
}

export enum FileType {
  Eps = 'eps',
  Jpg = 'jpg',
}

export enum SortOrder {
  BestMatch = 'best_match',
  MostPopular = 'most_popular',
  Newest = 'newest',
  Random = 'random',
}

export enum DisplaySizeName {
  Thumb = 'thumb',
  Preview = 'preview',
  Comp = 'comp',
  Mid = 'mid_res_comp',
  High = 'high_res_comp',
}

export type DisplaySize = {
  is_watermarked: boolean;
  name: DisplaySizeName;
  uri: string;
};

// https://api.gettyimages.com/swagger/index.html
export type SearchImagesParams = {
  'Accept-Language'?: string;
  'GI-Country-Code'?: string;
  age_of_people?: string;
  artists?: string;
  collection_codes?: string;
  collections_filter_type?: 'include' | 'exclude';
  color?: string;
  compositions?: Composition;
  download_product?: string;
  embed_content_only?: boolean;
  event_ids?: number[];
  ethnicity?: string[];
  exclude_nudity?: boolean;
  fields?: string[];
  file_types?: FileType;
  graphical_styles?: GraphicalStyle[];
  graphical_styles_filter_type?: 'include' | 'exclude';
  include_related_searches?: boolean;
  keyword_ids?: number[];
  minimum_size?: string;
  number_of_people?: string[];
  orientations?: string[];
  page?: number;
  page_size?: number;
  phrase: string;
  sort_order?: SortOrder;
  specific_people?: string[];
};

export enum ImageSize {
  XSmall = 'x_small',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'x_large',
  XXLarge = 'xx_large',
  Vector = 'vector',
}

type DownloadSize = {
  bytes: number;
  height: number;
  width: number;
  name: ImageSize;
  media_type: 'image/jpeg' | 'image/eps';
};

export interface GettyImage {
  id: number;
  caption: string;
  asset_family: string;
  display_sizes: DisplaySize[];
  license_model: string;
  max_dimensions: {
    width: number;
    height: number;
  };
  title: string;
  // `download_sizes` should be enabled in search params to get sizes
  download_sizes: DownloadSize[];
}

export type SearchImagesResponse = {
  result_count: number;
  images: GettyImage[];
  nextCursor: number;
};
