import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <div className = "navbar">
                <img
                src="Logo.png"
                style={{ paddingLeft: "40%" }}
                onClick={() => {
                    window.location.href = "/";
                }}
                />
                <div className = "flex" style = {{ justifyContent: "center", gap: "20px" }}>
                    <Link to="/">
                        <button>Hoare Triples</button>
                    </Link>
                    <Link to="/hi">
                        <button>Hi</button>
                    </Link>
                </div>
                <div>
                    <Link to="https://faculty.rpi.edu/konstantin-kuzmin">
                        <button>Kuzmin</button>
                    </Link>
                </div>    
            </div>
        </>
    );
}