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
