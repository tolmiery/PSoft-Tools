import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";

//Create Routing File
export default function Index() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{ justifyContent: "left", paddingTop: "5%" }}>
        <Editor
          height="100vh"
          width="50vw"
          defaultLanguage="javascript"
          defaultValue="// input code"
        />
      </div>
    </div>
  );
}
