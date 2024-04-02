import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { post } from "../lib/api";

//Create Routing File

export default function Index() {
  const [data, setData] = useState("hello");
  const [code, setCode] = useState("");

  const handleClick = () => {
    post("http://localhost:3000", code)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  const handleClick1 = () => {
    setData("");
    //setCode("// input code");
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      //console.log(value);
      setCode(value);
      //console.log(code);
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
          <Editor height="92vh" width="50vw" onChange={handleEditorChange} />
        </div>
        <div
          style={{
            position: "relative",
            paddingLeft: 15,
            whiteSpace: "pre-line",
            textAlign: "start",
            tabSize: 5,
          }}
        >
          {data}
        </div>
        <button
          onClick={handleClick1}
          style={{ position: "absolute", right: 150, bottom: 10 }}
        >
          Clear
        </button>
        <button
          onClick={handleClick}
          style={{ position: "absolute", right: 10, bottom: 10 }}
        >
          Run Dafny
        </button>
      </div>
    </div>
  );
}
