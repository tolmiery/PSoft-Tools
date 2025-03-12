import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../components/Navbar";
import Menu from "../components/ForwardReasoningMenu";
import { post } from "../lib/api";

export default function GenTriple() {
    const [data, setData] = useState(""); // To store Python result
    const [loading, setLoading] = useState(false); // Track loading state

    // Handle Python code execution
    const handleGenerateTriple = () => {
        setLoading(true); // Start loading
        post("http://localhost:3000/forwardsgen", "") // Send empty string as body, input handled elsewhere
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
        setData(""); // Clear the result
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
                    style={{ paddingLeft: "200px", paddingTop: "50px", width: "100%", overflow: "hidden" }}
                >
                    <div className="flex flex-col justify-center relative pl-8">
                        <div style={{ marginTop: "20px" }}>
                            {/* Button to trigger Python script execution */}
                            <button onClick={handleGenerateTriple} style={{ marginTop: "10px" }}>
                                {loading ? "Running..." : "Generate Problem"}
                            </button>
                        </div>

                        {/* Display the result */}
                        <div className="flex items-center justify-center w-full" style={{ whiteSpace: "pre", textAlign: "left" }}>
                            {loading ? (
                                <ThreeDots color="gray" height={100} width={100} />
                            ) : (
                                <div>
                                    {data && <pre>{data}</pre>} {/* Show the Python result */}
                                </div>
                            )}
                        </div>

                        {/* Clear button */}
                        <div className="flex flex-row justify-evenly max-h-11 mb-4">
                            <button onClick={handleClickClear}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
