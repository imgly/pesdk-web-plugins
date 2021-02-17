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
import React, { useEffect, useState } from 'react';
import { EditorApi, PhotoEditorSDKUI, UIEvent } from 'photoeditorsdk';
import { sdkConfig } from './sdkConfig';

export const App: React.FC = () => {
  const [editor, setEditor] = useState<EditorApi>();
  useEffect(() => {
    (async () => {
      setEditor(await PhotoEditorSDKUI.init(sdkConfig));
    })();
  }, []);

  useEffect(() => {
    if (!editor) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editor.on(UIEvent.EXPORT, async img => {
      alert('Image exported!');
    });
  }, [editor]);

  return <div className="editor" />;
};
