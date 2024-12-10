import Navbar from "../../components/Navbar";
import Menu from "../../components/DesignPatternsMenu";
import "./WhatStyles.css";


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
                    {/* Introduction to Design Patterns */}
                    <h1>What Are Design Patterns?</h1>
                    <p>
                        Design patterns are reusable solutions to common problems that occur during software development. They represent best practices that developers can use to solve specific design challenges in a way that is efficient, flexible, and scalable.
                    </p>
                    <p>
                        There are three main categories of design patterns, each focusing on a different aspect of software design:
                    </p>

                    <h2>1. Creational Design Patterns</h2>
                    <p>
                        Creational design patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. These patterns abstract the instantiation process, making the system more flexible in the types of objects it creates.
                    </p>

                    <h2>2. Behavioral Design Patterns</h2>
                    <p>
                        Behavioral design patterns focus on communication between objects, what happens between objects when a particular action is executed, and the patterns for object interactions. These patterns help to define how objects communicate, how responsibilities are assigned, and how messages are passed.
                    </p>

                    <h2>3. Structural Design Patterns</h2>
                    <p>
                        Structural design patterns deal with the composition of classes and objects. They help to organize different classes or objects into larger structures while ensuring that these structures remain flexible and efficient. These patterns focus on how to build complex structures from simpler objects.
                    </p>
                </div>
            </div>
        </div>
    );
}
