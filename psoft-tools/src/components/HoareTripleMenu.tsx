import { Link } from "react-router-dom";
import "./MenuStyles.css"

export default function ForwardReasoningMenu() {
    const isActive = (path: string) => location.pathname === path ? "active" : "";
    return (
        <div className="menuContainer" style={{ width: "200px" }}>
            <div className="menuItem" style= {{ width: "200px" }}>
                <Link to="/HoareTriple" >
                    Generate Problems
                </Link>
            </div>
            <div className="menuItem" style= {{ width: "200px" }} >
                <Link to="/HoareTriple" >
                    Generate Solutions
                </Link>
            </div>
            <div className="menuItem" style= {{ width: "200px" }}>
                <Link to="/HoareTriple" className={`link ${isActive("/HoareTriple")}`}>
                    Verify Solutions
                </Link>
            </div >

        </div>
    )
}