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
            defaultLanguage="javascript"
            defaultValue="// input code"
            onChange={handleEditorChange}
          />
          
        </div>
        <div className="flex" style={{ justifyContent: "center" }}>
          <div style={{top:50}}>Output. Output</div>
          <button 
            className="button"
            style={{ position: "absolute", right: 10, bottom: 10}}
            >
              Compile
            </button>     
        </div>
      </div>
    </div>
  );
}
