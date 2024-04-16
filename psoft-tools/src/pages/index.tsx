import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { post } from "../lib/api";
import { ThreeDots } from "react-loader-spinner";

//Create Routing File
interface ErrorObject {
  fileName: string;
  line: number;
  column: number;
  errorMessage: string;
}

export default function Index() {
  const [data, setData] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    post("http://localhost:3000/verify", code)
      .then((response) => {
        setLoading(false);
        setData(response);
        const errorText = response.slice(
          response.length - 9,
          response.length - 1
        );
        const expectedNonErrorText = "0 errors";
        let errorExists = true;

        if (errorText === expectedNonErrorText) {
          console.log("no error");
          errorExists = false;
        }

        if (errorExists) {
          const errorObjects: ErrorObject[] = [];
          const regex: RegExp = /(.*?)\((\d+),(\d+)\): Error: (.*)/g;

          let match;
          while ((match = regex.exec(response)) !== null) {
            console.log("yes");
            const fileName: string = match[1];
            const line: number = parseInt(match[2]);
            const column: number = parseInt(match[3]);
            const errorMessage: string = match[4];

            errorObjects.push({
              fileName,
              line,
              column,
              errorMessage,
            });
          }
        }
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  const handleRun = () => {
    setLoading(true);
    post("http://localhost:3000/run", code)
      .then((response) => {
        setLoading(false);
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
        <div className="flex flex-col justify-center relative pl-8">
          <div className=" flex-grow">
            {loading ? (
              <ThreeDots color="gray" height={100} width={100} />
            ) : (
              data
            )}
          </div>
          <div className="flex flex-row justify-evenly max-h-11 mb-4">
            <button onClick={handleClick1}>Clear</button>
            <button onClick={handleVerify}>Verify Dafny</button>
            <button onClick={handleRun}>Run Dafny</button>
          </div>
        </div>
      </div>
    </div>
  );
}
