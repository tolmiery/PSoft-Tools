import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { get } from "../lib/api";

//Create Routing File

export default function Index() {
  const [data, setData] = useState("hello");
  const handleClick = async () => {
    try {
      //const data = push();
      setData(data);
    } catch (err) {
      console.log("mistake");
    }
  };
  const [id, setId] = useState("");
  const handleClick1 = () => {
    get("http://localhost:3000")
      .then(response => {
        console.log(response);
      })  
      .catch(error => {
        console.error("error: ", error);
      })
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
          />
        </div>
        <div style={{top: 50, right: 50}}>{data}</div>
        <button 
          onClick={handleClick1}
          style={{position: "absolute", right: 10, bottom: 10}}
          >Click me</button>
      </div>
    </div>
  );
}
