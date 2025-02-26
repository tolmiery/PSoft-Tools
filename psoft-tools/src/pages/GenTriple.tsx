import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../components/Navbar";
import Menu from "../components/HoareTripleMenu";

export default function GenTriple() {
  const [pythonResult, setPythonResult] = useState(""); // Store the Python result
  const [loading, setLoading] = useState(false); // Track loading state
  const [pythonError, setPythonError] = useState<string | null>(null); // Track any Python error

  // Handle Python code execution (no input, just runs a default Python script)
  const handleRunPython = () => {
    /* 
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
    */
  };

  // Clear the results
  const handleClickClear = () => {
    setPythonResult(""); // Clear Python result
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
              <button onClick={handleRunPython} style={{ marginTop: "10px" }}>
                {loading ? "Running..." : "Generate Triple"}
              </button>
            </div>

            {/* Display the result */}
            <div className="flex-grow" style={{ whiteSpace: "pre", textAlign: "left" }}>
              {loading ? (
                <ThreeDots color="gray" height={100} width={100} />
              ) : (
                <div>
                  <div>{pythonResult && <pre>{pythonResult}</pre>}</div> {/* Python result */}
                </div>
              )}
            </div>

            {/* Error message for Python execution */}
            {pythonError && <div style={{marginTop: "10px" }}>{pythonError}</div>}

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
