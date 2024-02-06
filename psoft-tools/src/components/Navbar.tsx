import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <div className = "navbar">
                <>logo</>
                <div className = "flex" style = {{ justifyContent: "center", gap: "20px" }}>
                    <Link to="/">
                        <button>Hoare Triples</button>
                    </Link>
                    <Link to="/hi">
                        <button>Hi</button>
                    </Link>
                </div>
                <div
                    className = "flex"
                    style = {{ justifyContent: "flex-end", paddingRight: "40px" }}
                >
                </div>    
            </div>
        </>
    );
}