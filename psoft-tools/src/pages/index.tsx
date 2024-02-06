import { Editor } from "@monaco-editor/react"; 
import Navbar from "../components/Navbar";



//Create Routing File
export default function Index() {
  return (
    <div>
      <Navbar />
    </div>
    // <Editor
    //   height="90vh"
    //   width="100vw"
    //   defaultLanguage="javascript"
    //   defaultValue="// some comment"
    // />
  );
}
