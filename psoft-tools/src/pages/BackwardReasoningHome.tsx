import Navbar from "../components/Navbar";
import Menu from "../components/BackwardReasoningMenu";


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
