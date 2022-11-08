import { FileType } from './searchImages';

export type DownloadImageParams = {
  auto_download?: boolean;
  file_type?: FileType;
  height?: string;
};
