import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "../../components/DesignStyles.css";
import factory_uml from '../../assets/factory_pattern_uml_diagram.jpg';
import factory_code from '../../assets/factory_code_example.png';
import singleton_uml from '../../assets/singleton_uml.png';
import singleton_code from '../../assets/singleton_example.png';


//Provides a brief explanation of Creational Patterns, then lists and describes the individual
// patterns with some examples.
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

                    <p>
                        A common problem in Java and other Object-Oriented languages is that constructors are <b>inflexible.</b>
                    </p>
                    <p>
                        For example, they can't create a subtype of the type which they belong to, and they always return a new object while being unable to reuse the same object.
                    </p>
                    
                    <p>
                        Creational design patterns deal with alternative object creation mechanisms in a manner suitable to each situation. These patterns abstract the instantiation process, making the system more flexible in the types of objects it creates.
                    </p>

                    <div className="designPatternCard">
                        <h2>Singleton Pattern</h2>
                        <p>
                            Ensures <b>only one instance</b> of a class exists at any given time and provides a global point of access to that instance.
                        </p>
                        <p>
                            Class constructor is made private so that it is only called when the object is loaded, and cannot be called from the outside.
                        </p>
                        <span className="example">
                            Example: Database connection manager ensuring only one connection is used across the app.
                        </span>
                        <p>
                            Sample UML Diagram of a Singleton pattern:
                        </p>
                        <img src={singleton_uml} alt="UML diagram for a Singleton object" width="300" height="200"></img>
                        <span className="example">
                            Example: Singleton 'Bank' class with a public method that returns its instance.
                        </span>
                        <img src={singleton_code} alt="Code for the Singleton 'Bank' class" width="500" height="600"></img>
                    </div>

                    <div className="designPatternCard">
                        <h2>Factory Pattern</h2>
                        <p>
                            When the client wants <b>more control over object creation</b>, the Factory Pattern could be a good fit.
                        </p>
                        <p>
                            This pattern defines an interface for creating objects, but lets subclasses alter the type of objects that will be created by using inheritance. The logic and decisions behind object creation are hidden from the client.
                        </p>
                        <span className="example">
                            Example: ShapeFactory that returns different shapes like Circle, Square, or Rectangle.
                        </span>
                        <img src={factory_uml} alt="UML diagram for ShapeFactory" width="500" height="600"></img>
                        <span className="example">
                            Example: MatrixFactory returns new objects of differing classes based on conditional statements
                        </span>
                        <img src={factory_code} alt="Example code for Matrix Factory" width="500" height="600"></img>
                    </div>

                    {/*Builder pattern needs more detail and a picture example of a class diagram*/}
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