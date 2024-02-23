import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <div className = "navbar">
                <img
                src="Logo.png"
                style={{ paddingLeft: "50px" }}
                onClick={() => {
                    window.location.href = "/";
                }}
                />
                <div className = "flex" style = {{ justifyContent: "center", gap: "20px" }}>
                    <Link to="/">
                        <button className="button">Hoare Triples</button>
                    </Link>
                    <Link to="/hi">
                        <button className="button">Other Page</button>
                    </Link>
                </div>
                <div 
                    className="flex"
                    style = {{ justifyContent: "flex-end", paddingRight: "50px" }}
                >
                    <Link to="https://faculty.rpi.edu/konstantin-kuzmin">
                        <button className="button">Kuzmin</button>
                    </Link>
                </div>    
                
            </div>
        </>
    );
}