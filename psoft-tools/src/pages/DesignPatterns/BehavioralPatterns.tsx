import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "../../components/DesignStyles.css";
import observer_uml from '../../assets/observer_pattern_uml_diagram.jpg';


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

                    <p>
                        Behavioral design patterns focus on communication between objects, what happens between objects when a particular action is executed, and the patterns for object interactions. These patterns help to define how objects communicate, how responsibilities are assigned, and how messages are passed.
                    </p>

                    <div className="designPatternCard">
                        <h2>Observer Pattern</h2>
                        
                        <p>
                            This pattern defines a dependency between objects so that when one object <b>changes its state</b>, all its dependents (or "viewers") are <b>notified and updated</b> automatically.
                        </p>
                        <p>
                            <b>Push Model:</b> The object sends info directly to the observers
                        </p>
                        <p>
                            <b>Pull Model:</b> The object gives the observers access to its data, and the observers extract what they need.
                        </p>
                        <span className="example">
                            Example: A weather app where multiple widgets are updated when the weather data changes.
                        </span>
                        <p>
                            Sample UML diagram 
                        </p>
                        <img src={observer_uml} alt="UML diagram for an Observer pattern" width="400" height="300"></img>

                    </div>

                    <div className="designPatternCard">
                        <h2>Strategy Pattern</h2>
                        <p>
                            This pattern <b>defines a family of algorithms</b> and allows the client to <b>select which one to use</b> at runtime.
                        </p>
                        <p>
                            Useful when there are multiple algorithms that can be applied to solve the same task.
                        </p>
                        <span className="example">
                            Example: Collections.sort() takes a 'Comparator' parameter which determines how the elements will be sorted.
                        </span>
                        <span className="example">
                            Example: A payment system can take in an argument describing which payment method to use, such as credit card or PayPal.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Command Pattern</h2>
                        <p>
                            This pattern first wraps a request in an object, then passes it to an invoker object which then searches for another object that is suitable for handling the request.
                        </p>
                        <p>
                            Once found, the object receives the request from the invoker and executes the appropriate command.
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