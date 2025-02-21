import { Editor } from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { post } from "../lib/api";
import { ThreeDots } from "react-loader-spinner";
import dafnyParser from "../lib/DafnyParser";
import Menu from "../components/HoareTripleMenu";

//Create Routing File

export default function HoareTriple() {
    const [data, setData] = useState("");
    const [code, setCode] = useState("{x == 1}\nx = x + 1;\n{x == 2}");
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        setLoading(true);
        const dafnyCode = dafnyParser(code.replace(/\r\n/g, "\n"));
        console.log(dafnyCode);
        post("http://localhost:3000/verify", dafnyCode)
            .then((response) => {
                setLoading(false);
                setData(response);
            })
            .catch((error) => {
                console.error("error: ", error);
            });
    };

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
            
            {/* Sidebar menu */}
           <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                
                <div className="menuBar">
                <Menu />
                </div>

            
                <div
                
                    className="screen"
                    style={{paddingLeft: "200px", paddingTop: "50px", width: "100%", overflow: "hidden" }}
                >
                    <div style={{ width: "60%", justifyContent: "left" }}>

                        <Editor height="92vh" width="50vw" onChange={handleEditorChange} defaultLanguage="java"
                            defaultValue={`{x == 1}\nx = x + 1;\n{x == 2}`} />
                    </div>
                    <div className="flex flex-col justify-center relative pl-8">
                        <div className=" flex-grow" style={{ whiteSpace: "pre", textAlign: "left" }}>
                            {loading ? (
                                <ThreeDots color="gray" height={100} width={100} />
                            ) : (
                                data
                            )}
                        </div>
                
                        <div className="flex flex-row justify-evenly max-h-11 mb-4">
                            <button onClick={handleClickClear}>Clear</button>
                            <button onClick={handleVerify}>Verify Triple</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}