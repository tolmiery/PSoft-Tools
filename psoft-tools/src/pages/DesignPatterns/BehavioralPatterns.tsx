import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "../../components/DesignStyles.css";
import observer_uml from '../../assets/observer_pattern_uml_diagram.jpg';
import strategy_uml from '../../assets/strategy_uml.png';
import strategy_code from '../../assets/strategy_code.png';
import command_uml from '../../assets/command_uml.png';
import state_uml from '../../assets/state_uml.png';
import cor_uml from '../../assets/chain_of_responsibility_uml.png';


//Provides a brief explanation of Behavioral Patterns, then lists and describes the individual
// patterns with examples and UML diagrams .
export default function BehavioralPatterns() {
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
                        <p className="example">
                            Example: A weather app where multiple widgets are updated when the weather data changes.
                        </p>
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
                        <p className="example">
                            Example: Collections.sort() takes a 'Comparator' parameter which determines how the elements will be sorted.
                        </p>
                        <p className="example">
                            Example: A payment system can take in an argument describing which payment method to use, such as credit card or PayPal.
                        </p>
                        <p className="example">
                            Sample UML Diagram
                        </p>
                        <img src={strategy_uml} alt="UML diagram for a Strategy pattern" width="500" height="400"></img>
                        <p className="example">
                            Code example using mathematical functions as strategies
                        </p>
                        <img src={strategy_code} alt="Sample code for a strategy pattern using math functions" width="500" height="400"></img>


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
                        <img src={command_uml} alt="UML diagram for Command Pattern" width="500" height="600"></img>

                    </div>

                    <div className="designPatternCard">
                        <h2>State Pattern</h2>
                        <p>
                            This pattern describes object which changes its behavior according to its internal state. There are often separate objects to represent each state that are switched to in order to bring about the desired behavior.
                        </p>
                        <span className="example">
                            Example: A vending machine that behaves differently based on its current state (e.g., waiting for money, dispensing a product).
                        </span>
                        <img src={state_uml} alt="UML diagram for State Pattern" width="500" height="600"></img>

                    </div>

                    <div className="designPatternCard">
                        <h2>Chain of Responsibility Pattern</h2>
                        <p>
                            Passes requests along a chain of handlers where each handler decides whether to process the request or pass it along the chain to a handler with a different function.
                        </p>
                        <span className="example">
                            Example: Logging systems with different levels like INFO, DEBUG, or ERROR.
                        </span>
                        <img src={cor_uml} alt="UML diagram for Chain of Responsibility Pattern" width="500" height="600"></img>

                    </div>
                </div>
            </div>
        </div>
    );
}