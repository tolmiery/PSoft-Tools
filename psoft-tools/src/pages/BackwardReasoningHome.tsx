import Navbar from "../components/Navbar";
import Menu from "../components/BackwardReasoningMenu";

{/* Backward Reasoning Design Page */}
export default function BackwardsReasoningHome() {
    return (
        <div >
            <div className="navbar">
                <Navbar />
            </div>
            <div className="menuBar">
                <div className="menu">
                    <Menu />
                </div>

            </div>
        </div>
    );
}
