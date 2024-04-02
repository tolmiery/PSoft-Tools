import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { post } from "../lib/api.ts"



//Create Routing File
const DEFAULT_CODE = "//Input Code(Delete me before running)"
const DEFAULT_DATA = "Dafny Confirmed Validity:"

export default function Index() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [code, setCode] = useState(DEFAULT_CODE);
  
  const handleClick = () => {
    post("http://localhost:3000/Hoars_Tripple", code)
      .then(response => {
        //console.log("HI");
        console.log(response);

        setData(DEFAULT_DATA + response.toString());
      })  
      .catch(error => {
        console.error("error: ", error);
      })
  };

  const handleClickClear = () => {
    setCode(DEFAULT_CODE); 
    setData(DEFAULT_DATA);
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
          <div style={{ marginBottom: "10px" }}>
            <p>Please input code like the following example below:</p>
            <p>
              {/* Example code */}
              <code style = {{ whiteSpace: "pre-wrap"}}>
                {"{precondition}\ncode\n{postcondition}"}
              </code>
            </p>
          </div>
          <Editor
            height="75vh"
            width="50vw"
            defaultLanguage="javascript"
            value={code}
            onChange={handleEditorChange}
          />
        </div>
        <div style={{position: "relative", paddingLeft: 15, whiteSpace: "pre-line", textAlign: "start", tabSize: 5, alignSelf: "center", marginLeft: "25%"}}>
          {data}
        </div>
        <button 
          onClick={handleClickClear}
          style={{position: "absolute", right: 150, bottom: 10}}
          >Clear</button>
        <button 
          onClick={handleClick}
          style={{position: "absolute", right: 10, bottom: 10}}
          >Run Dafny</button>
      </div>
    </div>
  );
}