export enum ErrorNames {
  TokenExpired,
  TokenCannotFetch,
  TokenRefetchLimit,
  InvalidParameterValue,
  UnauthorizedDisplaySize,
  /**
   * display size high_res_comp should be available from /search/images
   * if not you need to check if given api key support high_res_comp display size
   */
  ImageSizeNotFound,
}

export type OnError = (errorName: ErrorNames, e?: Error) => void;
