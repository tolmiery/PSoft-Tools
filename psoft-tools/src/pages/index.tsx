import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { get } from "../lib/api";


//Create Routing File

export default function Index() {
  const [data, setData] = useState("hello");
  const [code, setCode] = useState("");
  
  const handleClick = () => {
    get("http://localhost:3000")
      .then(response => {
        console.log(response);
      })  
      .catch(error => {
        console.error("error: ", error);
      })
  };
  
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  
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
            height="92vh"
            width="50vw"
            defaultLanguage="javascript"
            defaultValue="// input code"
            onChange={handleEditorChange}
          />
        </div>
        <div style={{top: 50, right: 50}}>{data}</div>
        <button 
          onClick={handleClick}
          style={{position: "absolute", right: 10, bottom: 10}}
          >Click me</button>
      </div>
    </div>
  );
}
