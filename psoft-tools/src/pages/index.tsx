import { Editor } from "@monaco-editor/react"; 
import Navbar from "../components/Navbar";
import { useState } from "react";

//Create Routing File
const [id, setId] = useState('')
const [data, setData] = useState(null)

const handleClick = async () => {
  try{
    //const data = push();
    setData(data)
  } catch (err) {
    console.log("mistake")
  }
}
export default function Index() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="screen" style={{ paddingTop: "50px", width: "100%", overflow: "hidden" }}>
        <div style = {{ width: "50%", justifyContent: "left" }}>
          <Editor
            height="92vh"
            width="50vw"
            defaultLanguage="javascript"
            defaultValue="// input code"
          />
        </div>
        <div className="flex" style={{ justifyContent: "center" }}>
          <div style={{top:50}}>data</div>
          <button 
            className="button"
            style={{ position: "absolute", right: 10, bottom: 10}}
            onClick={handleClick}
            >
              Compile
            </button>     
        </div>
      </div>
    </div>
  );
}
