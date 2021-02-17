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
import React from 'react';

type ObserverOptions = {
  root?: React.RefObject<Element>;
  target: React.RefObject<Element>;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect(): void;
};

export function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: ObserverOptions): void {
  React.useEffect(() => {
    const el = target.current;
    if (!enabled || !el) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled, onIntersect]);
}
