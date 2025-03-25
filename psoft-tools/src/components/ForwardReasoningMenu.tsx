
import { Link } from "react-router-dom";
import "./MenuStyles.css"

export default function ForwardReasoningMenu() {
    const isActive = (path: string) => location.pathname === path ? "active" : "";
    return (
        <div className="menuContainer" style={{ width: "200px" }}>
            <div className="menuItem" style= {{ width: "200px" }}>
                <Link to="/ForwardsGen" className={`link ${isActive("/ForwardsGen")}`}>
                    Generate Problems
                </Link>
            </div>
            <div className="menuItem" style= {{ width: "200px" }} >
                <Link to="/ForwardReasoning" >
                    Generate Solutions
                </Link>
            </div>
            <div className="menuItem" style= {{ width: "200px" }}>
                <Link to="/ForwardReasoning" className={`link ${isActive("/ForwardReasoning")}`}>
                    Verify Solutions
                </Link>
            </div >

        </div>
    )
}