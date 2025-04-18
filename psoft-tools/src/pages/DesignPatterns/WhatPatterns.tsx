import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "../../components/DesignStyles.css";
import { Link } from "react-router-dom";


export default function DesignPatterns() {
    const isActive = (path: string | string[]) => {
        if (Array.isArray(path)) {
            return path.includes(location.pathname) ? "active" : "";
        }
        return location.pathname === path ? "active" : "";
    };

    return (
        <div>
            {/* Navbar at the top */}
            <Navbar />

            {/* Main container for the layout */}
            <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                {/* Sidebar menu */}
                <div className="menuBar">
                    <Menu />
                </div>

                {/* Main content area */}
                <div className="mainContent">
                    {/* Introduction to Design Patterns */}
                    <h1>What Are Design Patterns?</h1>
                    <p>
                        Design patterns are <b>reusable solutions</b> to <b>common problems</b> that occur during software development. They represent best practices that developers can use to solve specific design challenges in a way that is <b>efficient, flexible, and scalable</b>.
                    </p>
                    <p>
                        They promote <b>extensibility and reuse</b> of existing code, helping to build software that is <b>open to extension</b> but <b>closed to modification</b>.
                    </p>
                    <p>
                        Design patterns don't solve every problem, but they can help significantly. After getting something basic working, consider refactoring to incorporate design patterns that address your specific problem(s).
                    </p>

                    <p>
                        There are three main categories of design patterns, each focusing on a different aspect of software design:
                    </p>
                    <Link to="/DesignPatterns/CreationalPatterns" className={`link ${isActive("/DesignPatterns/CreationalPatterns")}`}>
                        <h2>Creational Design Patterns</h2>
                    </Link>
                    <Link to="/DesignPatterns/BehavioralPatterns" className={`link ${isActive("/DesignPatterns/BehavioralPatterns")}`}>
                        <h2>Behavioral Design Patterns</h2>
                    </Link>                    
                    <Link to="/DesignPatterns/StructuralPatterns" className={`link ${isActive("/DesignPatterns/StructuralPatterns")}`}>
                        <h2>Structural Design Patterns</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}
