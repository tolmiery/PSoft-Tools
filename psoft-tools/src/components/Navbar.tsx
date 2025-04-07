import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const [isImageHighlighted, setIsImageHighlighted] = useState(false);

    const handleMouseDown = () => {
        setIsImageHighlighted(true);
    };

    const handleMouseUp = () => {
        setIsImageHighlighted(false);
        window.location.href =
            "https://www.cs.rpi.edu/academics/courses/spring25/csci2600/";
    };

    const isActive = (path: string | string[]) => {
        if (Array.isArray(path)) {
            return path.includes(location.pathname) ? "active" : "";
        }
        return location.pathname === path ? "active" : "";
    };
    return (
        <>
            <div
                className="navbar"
                style={{ width: "100%", margin: "auto" }}
            >
                <div className="logo_" >

                    <img
                        src="../Logo.png"
                        style={{
                            border: isImageHighlighted ? "1px solid white" : "none",
                            width: 46,
                            height: 46,

                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={() => setIsImageHighlighted(false)}
                    />
                </div>
                <div className="options">
                <Link to="/index" className={`link ${isActive("/index")}`}>
                        Dafny Verifier
                    </Link>
                    <Link to="/HoareTriple" className={`link ${isActive(["/HoareTriple", "/GenTriple", "/SolveTriple"])}`}>
                        Hoare Triples
                    </Link>
                    <Link to="/ForwardReasoning" className={`link ${isActive(["/ForwardReasoning", "/ForwardsGen"])}`}>
                        Forward Reasoning
                    </Link>
                    <Link to="/BackwardReasoning" className={`link ${isActive(["/BackwardReasoning", "/BackwardsGen"])}`}>
                        Backward Reasoning
                    </Link>
                    <Link to="/ConditionStrength" className={`link ${isActive("/ConditionStrength")}`}>
                        Condition Strength
                    </Link>
                    <Link to="/DesignPatterns" className={`link ${isActive("/DesignPatterns")}`}>
                        Design Patterns
                    </Link>
                    <Link to="/CFGCanvas" className={`link ${isActive("/CFGCanvas")}`}>
                        CFG
                    </Link>

                </div>

            </div >
        </>
    );
}
