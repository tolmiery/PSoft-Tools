import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "./BehavioralStyles.css";

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
                    {/* Behavioral Design Patterns */}
                    <h1>Behavioral Design Patterns</h1>

                    <div className="designPatternCard">
                        <h2>Observer Pattern</h2>
                        <p>
                            Defines a dependency between objects so that when one object changes its state, all its dependents are notified and updated automatically.
                        </p>
                        <span className="example">
                            Example: A weather app where multiple widgets are updated when the weather data changes.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Strategy Pattern</h2>
                        <p>
                            Allows a family of algorithms to be defined and makes them interchangeable at runtime.
                        </p>
                        <span className="example">
                            Example: A payment system that supports multiple payment methods like credit card or PayPal.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Command Pattern</h2>
                        <p>
                            Encapsulates a request as an object, allowing users to parameterize objects with different requests, queue them, or log them.
                        </p>
                        <span className="example">
                            Example: Undo/Redo functionality in a text editor.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>State Pattern</h2>
                        <p>
                            Allows an object to change its behavior when its internal state changes.
                        </p>
                        <span className="example">
                            Example: A vending machine that behaves differently based on its current state (e.g., waiting for money, dispensing a product).
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Chain of Responsibility Pattern</h2>
                        <p>
                            Passes requests along a chain of handlers where each handler decides whether to process the request or pass it along the chain.
                        </p>
                        <span className="example">
                            Example: Logging systems with different levels like INFO, DEBUG, or ERROR.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}