import { Link } from "react-router-dom";
import "./MenuStyles.css"

export default function ForwardReasoningMenu() {
    const isActive = (path: string) => location.pathname === path ? "active" : "";
    return (
        <div className="menuContainer" style={{ width: "200px" }}>
            <div className="menuItem" style= {{ width: "200px" }}>
                <Link to="/BackwardsGen" className={`link ${isActive("/BackwardsGen")}`}>
                    Generate Problems
                </Link>
            </div>
            {/*TODO: Generate Solutions to the problems*/}
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