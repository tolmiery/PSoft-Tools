import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../components/Navbar";
import Menu from "../components/HoareTripleMenu";
import { post } from "../lib/api";
import "./HoareTriple.css"; 

export default function GenTriple() {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateTriple = () => {
        setLoading(true);
        post("http://localhost:3000/gentriple", "")
            .then((response) => {
                setLoading(false);
                setData(response);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error: ", error);
                setData("Error executing Python script");
            });
    };

    const handleClickClear = () => {
        setData("");
    };

    // Split the output for formatting
    const formatOutput = () => {
        const lines = data.trim().split("\n");
        if (lines.length < 2) return <pre className="formatted-output">{data}</pre>;

        const precondition = lines[0];
        const postcondition = lines[lines.length - 1];
        const commands = lines.slice(1, -1);

        return (
            <div className="hoare-triple-container">
                <div className="precondition">{precondition}</div>
                <div className="command">
                    {commands.map((line, idx) => (
                        <div key={idx}>{line}</div>
                    ))}
                </div>
                <div className="postcondition">{postcondition}</div>
            </div>
        );
    };


    return (
        <div>
            <Navbar />  
            <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                <div className="menuBar">
                    <Menu />
                </div>

                <div className="screen" style={{ paddingLeft: "200px", paddingTop: "50px", width: "100%", overflow: "hidden" }}>
                    <div className="flex flex-col justify-center relative pl-8">

                        {/*Buttons Div*/}
                        <div className="action-buttons">
                            {/*Generate button*/}
                            <button 
                                onClick={handleGenerateTriple} 
                                className="generate-btn" 
                                disabled={loading}
                            >
                                {loading ? "Running..." : "Generate Triple"}
                            </button>
                            {/*Clear Button */}
                            <button 
                                onClick={handleClickClear} 
                                className="clear-btn" 
                                disabled={loading}
                            >
                                Clear
                            </button>
                        </div>

                        {/*Container Div*/}
                        <div className="result-container">
                            {loading ? (
                                <div className="loading-spinner">
                                    <ThreeDots color="gray" height={100} width={100} />
                                </div>
                            ) : (
                                data && formatOutput()
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
