import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "../../components/DesignStyles.css";

export default function DesignPatterns() {
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
                    {/* Structural Design Patterns */}
                    <h1>Structural Design Patterns</h1>

                    <div className="designPatternCard">
                        <h2>Adapter Pattern</h2>
                        <p>
                            Allows incompatible interfaces to work together by providing a wrapper that adapts one interface to another.
                        </p>
                        <span className="example">
                            Example: A plug adapter that allows a device to use a different power plug standard.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Facade Pattern</h2>
                        <p>
                            Provides a simplified interface to a complex subsystem, making it easier to use.
                        </p>
                        <span className="example">
                            Example: A home theater system where the user interacts with one interface to control multiple devices like the TV, speakers, and DVD player.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Composite Pattern</h2>
                        <p>
                            Allows individual objects and compositions of objects to be treated uniformly.
                        </p>
                        <span className="example">
                            Example: A file system where files and directories are treated uniformly.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Decorator Pattern</h2>
                        <p>
                            Adds additional responsibilities to an object dynamically, providing a flexible alternative to subclassing for extending functionality.
                        </p>
                        <span className="example">
                            Example: A coffee shop where you can customize your coffee by adding extra options like milk, sugar, etc.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Bridge Pattern</h2>
                        <p>
                            Decouples an abstraction from its implementation, allowing the two to vary independently.
                        </p>
                        <span className="example">
                            Example: A remote control that can work with various devices like a TV, fan, or light without knowing their internal workings.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Proxy Pattern</h2>
                        <p>
                            Provides an object representing another object, typically to control access, or add functionality.
                        </p>
                        <span className="example">
                            Example: A virtual proxy used to load large image files only when needed.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}