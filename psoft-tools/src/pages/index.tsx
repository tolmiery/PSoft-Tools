import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

//Create Routing File
export default function Index() {
  const [code, setCode] = useState("");
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  useEffect(() => {
    console.log(code);
  }, [code]);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        className="screen"
        style={{ paddingTop: "50px", width: "100%", overflow: "hidden" }}
      >
        <div style={{ width: "50%", justifyContent: "left" }}>
          <Editor
            height="100vh"
            width="50vw"
            defaultLanguage="java"
            defaultValue="// input code"
            onChange={handleEditorChange}
          />
        </div>
        <div className="flex" style={{ justifyContent: "center" }}>
          Enter your Dafny code in the editor. Output will appear here.
        </div>
      </div>
    </div>
  );
}
