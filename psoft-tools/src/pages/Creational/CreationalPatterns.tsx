import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "./CreationalStyles.css"


export default function CreationalPatterns() {

    return (
        <div>
            <div >
                <div className="navbar">
                    <Navbar />
                </div>
                <div style={{ position: "relative" }}>
                    <div className="menuBar">
                        <div className="menu">
                            <Menu />
                        </div>

                    </div>
                    <div className="mainContent" style={{ position: "relative" }}>


                    </div>
                </div>
            </div>
        </div >
    )
}