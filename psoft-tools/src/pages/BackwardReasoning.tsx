//Backwards reasoning Page
import Navbar from "../components/Navbar";
import Menu from "../components/BackwardReasoningMenu";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { post } from "../lib/api";
import { ThreeDots } from "react-loader-spinner";

export default function BackwardReasoning() {
    const [data, setData] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClickClear = () => {
        setData("");
        setCode("// input code");
    };
    {/*Sends input to Dafny*/}
    const handleReasoning = () => {
        setLoading(true);
        console.log(code);
        post("http://localhost:3000/backward-reasoning", code)
            .then((response) => {
                setLoading(false);
                console.log(response);
                setData(response);
            })
            .catch((error) => {
                console.error("error: ", error);
            });
    }
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
            
            {/*Sidebar Menu */} 
            <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                <div className="menuBar">
                    <Menu />
                </div>
                
                <div
                    className="screen"
                    style={{ paddingLeft: "200px", paddingTop: "50px", width: "100%", overflow: "hidden" }}
                >
                    {/* Input Screen */}
                    <div style={{ width: "60%", justifyContent: "left" }}>

                        <Editor height="92vh" width="100%" onChange={handleEditorChange} defaultLanguage="dafny"
                            defaultValue="// Input should be in the format 'code {postcondition}'" />
                    </div>
                    {/* Output Screen */}
                    <div className="flex flex-col  relative pl-8 ">
                        <div className=" flex-grow" style={{ whiteSpace: "pre", textAlign:"left"}}>
                            {loading ? (
                                <ThreeDots color="gray" height={100} width={100} />
                            ) : (
                                data
                            )}
                        </div>
                        {/*buttons*/}
                        <div className="flex flex-row justify-evenly max-h-11 mb-4">
                            <button onClick={handleClickClear}>Clear</button>
                            <button onClick={handleReasoning}>Backward Reasoning</button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

