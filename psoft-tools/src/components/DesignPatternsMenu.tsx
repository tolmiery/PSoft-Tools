
import { useState } from "react";
import { Link } from "react-router-dom";


export default function DesignPatternsMenu() {

    return (
        <div className="menuContainer">
            <div>
                <Link to="/Factory">
                    What are design patterns?
                </Link>
            </div>
            <div>
                <Link to="/Factory">
                    Creational design patterns
                </Link>
            </div>
            <div>
                <Link to="/Factory">
                    Behavioral design patterns
                </Link>
            </div >
            <div>
                <Link to="/Factory">
                    Structural design patterns
                </Link>
            </div>

        </div>
    )
}