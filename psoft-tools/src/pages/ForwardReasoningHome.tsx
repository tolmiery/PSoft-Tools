import Navbar from "../components/Navbar";
import Menu from "../components/ForwardReasoningMenu";

{/* Forward Reasoning Design Page*/}
export default function ForwardReasoningHome() {
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
