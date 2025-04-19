import Navbar from "../components/Navbar";
import { useState } from "react";
import { post } from "../lib/api";
import { ThreeDots } from "react-loader-spinner";
import DafnyEditor from "../components/DafnyEditor";

//Create Routing File
interface ErrorObject {
   fileName: string;
   line: number;
   column: number;
   errorMessage: string;
}

{/* Dafny Verification Page */}
export default function Index() {
   const [data, setData] = useState("");
   const [code, setCode] = useState("// Please enter dafny code below and delete this comment!");
   const [loading, setLoading] = useState(false);

   {/* Sends code to Dafny for verification */}
   const handleVerify = () => {
      setLoading(true);
      post("http://localhost:3000/verify", code)
         .then((response) => {
            setLoading(false);
            setData(response);
            {/*Review to see if this is needed, where is this being printed out in ???*/}
            const errorText = response.slice(
               response.length - 9,
               response.length - 1
            );
            const expectedNonErrorText = "0 errors";
            let errorExists = true;
            {/*Error Catching*/}
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

   {/*Currently redundant function does the same thing as verification*/}
   const handleRun = () => {
      setLoading(true);
      post("http://localhost:3000/verify", code)
         .then((response) => {
            setLoading(false);
            setData(response);
         })
         .catch((error) => {
            console.error("error: ", error);
         });
   };
   {/*Clears Data*/}
   const handleClickClear = () => {
      setData("");
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
            {/*Input Screen */}
            <div style={{ width: "50%", justifyContent: "left" }}>

               <DafnyEditor
                  EditorProps={{
                     height: "92vh",
                     width: "50vw",
                     onChange: handleEditorChange,
                     defaultLanguage: "dafny",
                     defaultValue: "// Input should be in the format of dafny code",
                  }}
               />
            </div>
            {/*Output Screen*/}
            <div className="flex flex-col justify-center relative pl-8">
               <div className=" flex-grow" style={{ whiteSpace: "pre", textAlign: "left" }}>
                  {loading ? (
                     <ThreeDots color="gray" height={100} width={100} />
                  ) : (
                     data
                  )}
               </div>
               {/*buttons*/}
               <div className="flex flex-row justify-evenly max-h-11 mb-4">
                  <button onClick={handleClickClear}>Clear</button>
                  <button onClick={handleVerify}>Verify Dafny</button>
                  <button onClick={handleRun}>Run Dafny</button>
               </div>
            </div>
         </div>
      </div>
   );
}