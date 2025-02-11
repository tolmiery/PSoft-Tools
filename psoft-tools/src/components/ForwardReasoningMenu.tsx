
import { Link } from "react-router-dom";
import "./MenuStyles.css"

export default function ForwardReasoningMenu() {

    return (
        <div className="menuContainer">
            <div className="menuItem">
                <Link to="/ForwardReasoning">
                    Generate Problems
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/ForwardReasoning">
                    Generate Solutions
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/ForwardReasoning">
                    Verify Solutions
                </Link>
            </div >

        </div>
    )
}