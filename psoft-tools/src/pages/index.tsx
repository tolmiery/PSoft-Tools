import { Editor } from "@monaco-editor/react";

//Create Routing File
export default function Index() {
  return (
    <Editor
      height="90vh"
      width="100vw"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}
