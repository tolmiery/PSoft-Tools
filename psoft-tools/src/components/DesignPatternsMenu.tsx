
import { Link } from "react-router-dom";
import "./MenuStyles.css"

export default function DesignPatternsMenu() {

    return (
        <div className="menuContainer">
            <div className="menuItem">
                <Link to="/DesignPatterns/WhatPatterns">
                    What are design patterns?
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/DesignPatterns/CreationalPatterns">
                    Creational design patterns
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/DesignPatterns/BehavioralPatterns">
                    Behavioral design patterns
                </Link>
            </div >
            <div className="menuItem">
                <Link to="/DesignPatterns/StructuralPatterns">
                    Structural design patterns
                </Link>
            </div>

        </div>
    )
}