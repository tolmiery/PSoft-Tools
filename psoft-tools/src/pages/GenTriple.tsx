import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../components/Navbar";
import Menu from "../components/HoareTripleMenu";
import { post } from "../lib/api";
import "./Triple.css"; // Make sure to create this CSS file

export default function GenTriple() {
    const [data, setData] = useState(""); // To store Python result
    const [loading, setLoading] = useState(false); // Track loading state

    // Handle Python code execution
    const handleGenerateTriple = () => {
        setLoading(true); // Start loading
        post("http://localhost:3000/gentriple", "") 
            .then((response) => {
                setLoading(false); // Stop loading
                setData(response); // Set the Python script output
            })
            .catch((error) => {
                setLoading(false); // Stop loading in case of error
                console.error("Error: ", error);
                setData("Error executing Python script"); // Set error message
            });
    };

    // Clear the results
    const handleClickClear = () => {
        setData(""); 
    };

    // Function to parse and format Hoare triple
    const formatHoareTriple = (data) => {
        if (!data) return null;
        
        // Uses Regex to split the triple into parts
        const triplePattern = /\{([^{}]*)\}(.*?)\{([^{}]*)\}/s;
        const match = data.match(triplePattern);
        
        if (match) {
            return (
                <div className="hoare-triple">
                    <div className="precondition">{`{${match[1]}}`}</div>
                    <div className="command">{match[2].trim()}</div>
                    <div className="postcondition">{`{${match[3]}}`}</div>
                </div>
            );
        } else {
            // If the pattern doesn't match, just display as is
            return <pre>{data}</pre>;
        }
    };

    return (
        <div>
            {/* Top navigation bar allowing us to traverse pages */}
            <div>
                <Navbar />
            </div>
            
            {/* Sidebar menu */}
            <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                <div className="menuBar">
                    <Menu />
                </div>

                <div className="screen" style={{ paddingLeft: "200px", paddingTop: "50px", width: "100%", overflow: "hidden" }}>
                    <div className="flex flex-col justify-center relative pl-8">
                        <div className="action-buttons">
                            {/* Button to trigger Python script execution */}
                            <button 
                                onClick={handleGenerateTriple} 
                                className="generate-btn"
                                disabled={loading}
                            >
                                {loading ? "Running..." : "Generate Triple"}
                            </button>
                            
                            {/* Clear button */}
                            <button 
                                onClick={handleClickClear}
                                className="clear-btn"
                                disabled={loading || !data}
                            >
                                Clear
                            </button>
                        </div>

                        {/* Display the result */}
                        <div className="result-container">
                            {loading ? (
                                <div className="loading-spinner">
                                    <ThreeDots color="#4a90e2" height={80} width={80} />
                                </div>
                            ) : (
                                <div className="hoare-triple-container">
                                    {data && formatHoareTriple(data)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}