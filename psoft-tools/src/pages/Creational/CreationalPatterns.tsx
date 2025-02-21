import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "../../components/DesignStyles.css";

export default function CreationalPatterns() {
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
                    <h1>Creational Design Patterns</h1>

                    <div className="designPatternCard">
                        <h2>Singleton Pattern</h2>
                        <p>
                            Ensures that a class has only one instance and provides a global point of access to it.
                        </p>
                        <span className="example">
                            Example: Database connection manager ensuring only one connection is used across the app.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Factory Pattern</h2>
                        <p>
                            Defines an interface for creating objects, but lets subclasses alter the type of objects that will be created.
                        </p>
                        <span className="example">
                            Example: ShapeFactory that returns different shapes like Circle, Square, or Rectangle.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Builder Pattern</h2>
                        <p>
                            Separates the construction of a complex object from its representation, allowing the same construction process to create various representations.
                        </p>
                        <span className="example">
                            Example: Building a house with customizable properties like roof type, floor type, etc.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}