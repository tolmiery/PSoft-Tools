import Navbar from "../components/Navbar";
import { Menu } from "../components/DesignPatternsMenu";


export default function DesignPatterns() {
    return (
        <div >
            <div className="navbar">
                <Navbar />
            </div>
            <div className="menuBar"
                style={{ paddingTop: "50px", width: "100%", overflow: "hidden" }}>
                <div className="menu">
                    <Menu />
                </div>

            </div>
        </div>
    );
}
