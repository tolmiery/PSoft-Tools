
import { useState } from "react";
import { Link } from "react-router-dom";
import "./MenuStyles.css"

export default function DesignPatternsMenu() {

    return (
        <div className="menuContainer">
            <div className="menuItem">
                <Link to="/Factory">
                    What are design patterns?
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/Creational/CreationalPatterns">
                    Creational design patterns
                </Link>
            </div>
            <div className="menuItem">
                <Link to="/Factory">
                    Behavioral design patterns
                </Link>
            </div >
            <div className="menuItem">
                <Link to="/Factory">
                    Structural design patterns
                </Link>
            </div>

        </div>
    )
}