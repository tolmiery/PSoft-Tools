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

                    <p>
                        Structural design patterns deal with the composition of classes and objects. They help to organize different classes or objects into larger structures while ensuring that these structures remain flexible and efficient. These patterns focus on how to build complex structures from simpler objects.
                    </p>

                    <div className="designPatternCard">
                        <h2>Adapter Pattern</h2>
                        <p>
                            The adapter pattern <b>updates the interface</b> used to access a class <b>without changing the class's functionality</b>. This is useful when attempting to use two incompatible interfaces together.
                        </p>
                        <p>
                            This pattern is especially helpful when needing to convert output, whether it be 
                        </p>
                        <span className="example">
                            Example: A plug adapter that allows a device to use a different power plug standard.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Facade Pattern</h2>
                        <p>
                            When working with a powerful and extensive library, the Facade pattern can provide a simpler interface that <b>hides irrelevant complexity</b> from the client.
                        </p>
                        <p>
                            This pattern <b>decreases interactions between the client and the complex subsystem</b>, providing an easier and consistent interface for the client to interact with.
                        </p>
                        <span className="example">
                            Example: A home theater system where the user interacts with one interface to control multiple devices like the TV, speakers, and DVD player.
                        </span>
                    </div>

                    <div className="designPatternCard">
                        <h2>Composite Pattern</h2>
                        <p>
                            Allows individual objects and compositions of objects to be treated uniformly by organizing them into a tree structure
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
                            A class encloses another class object, having the same interface and functionality while controlling all outside access to the enclosed object.
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