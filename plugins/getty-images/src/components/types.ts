import { GettyImage, SearchImagesResponse } from '../api';

export type ToolbarUiProps = {
  loading: boolean;
  loadingRef: React.MutableRefObject<HTMLDivElement | null>;
  pages: SearchImagesResponse[];
  placeholder?: string;
  setImage(img: GettyImage): Promise<void>;
  showFilters?: boolean;
};
