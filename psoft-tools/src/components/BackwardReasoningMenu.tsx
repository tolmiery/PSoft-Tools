
import { Link } from "react-router-dom";
import "./MenuStyles.css"
/* Main layout for backwards reasoning*/
export default function BackwardsReasoningMenu() {
    const isActive = (path: string) => location.pathname === path ? "active" : "";
    return (
        <div className="menuContainer" style={{ width: "200px" }}>
            <div className="menuItem" style= {{ width: "200px" }}>
                <Link to="/BackwardReasoning" >
                    Generate Problems
                </Link>
            </div>
            <div className="menuItem" style= {{ width: "200px" }} >
                <Link to="/BackwardReasoning" >
                    Generate Solutions
                </Link>
            </div>
            <div className="menuItem" style= {{ width: "200px" }}>
                <Link to="/BackwardReasoning" className={`link ${isActive("/BackwardReasoning")}`}>
                    Verify Solutions
                </Link>
            </div >

        </div>
    )
}