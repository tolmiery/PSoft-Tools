import Navbar from "../components/Navbar";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { post } from "../lib/api";
import { ThreeDots } from "react-loader-spinner";

// TO BE IMPLEMENTED:
// Tool that takes in two conditions and compares their strength, sending a message to the console
//  that describes which one is stronger or weaker.
// Current structure is inherited from Backwards Reasoning page.
export default function ConditionStrength() {
    const [data, setData] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClickClear = () => {
        setData("");
        setCode("// input conditions");
    };

    //Reads the input conditions and sends them to the backend to process comparative strength
    const handleStrength = () => {
        setData("Not implemented yet");
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

            <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>

                <div
                    className="screen"
                    style={{ paddingTop: "50px", width: "100%", overflow: "hidden" }}
                >
                    <div style={{ width: "60%", justifyContent: "left" }}>

                        <Editor height="92vh" width="100%" onChange={handleEditorChange} defaultLanguage="dafny"
                            defaultValue="// Input should be in the format 'condition1, condition2'" />
                    </div>
                    <div className="flex flex-col  relative pl-8 ">
                        <div className=" flex-grow" style={{ whiteSpace: "pre", textAlign:"left"}}>
                            {loading ? (
                                <ThreeDots color="gray" height={100} width={100} />
                            ) : (
                                data
                            )}
                        </div>
                        <div className="flex flex-row justify-evenly max-h-11 mb-4">
                            <button onClick={handleClickClear}>Clear</button>
                            <button onClick={handleStrength}>Compare Strength</button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

