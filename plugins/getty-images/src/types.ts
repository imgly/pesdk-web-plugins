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
export enum ErrorNames {
  TokenExpired,
  TokenCannotFetch,
  TokenRefetchLimit,
  InvalidParameterValue,
  UnauthorizedDisplaySize,
  // display size high_res_comp should be available from /search/images
  // if not you need to check if given api key support high_res_comp display size
  ImageSizeNotFound,
}

export type OnError = (errorName: ErrorNames, e?: Error) => void;
