import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { get } from "../lib/api";

//Create Routing File
export default function Index() {
  const handleClick = () => {
    const response = get("http://localhost:3000");
    console.log(response);
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
            height="100vh"
            width="50vw"
            defaultLanguage="javascript"
            defaultValue="// input code"
          />
        </div>
        <div className="flex" style={{ justifyContent: "center" }}>
          Output.Output.Output.Output
        </div>
        <button onClick={handleClick}>Click me</button>
      </div>
    </div>
  );
}
